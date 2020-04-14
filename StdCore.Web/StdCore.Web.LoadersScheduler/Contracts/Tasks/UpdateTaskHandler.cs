using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Std.Common.DateTime;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Interfaces;
using Std.WebClient.SignalR;

namespace Std.WebClient.Contracts.Tasks
{
    public class UpdateTaskHandler: IRequestHandler<UpdateTaskRequest, UpdateTaskResponse>
    {
        private readonly RepositoryBase<TaskEntity> _taskRepository;
        private readonly ITaskService _taskService;
        private readonly TaskHubContextWrapper _taskHubContextWrapper;

        public UpdateTaskHandler(RepositoryBase<TaskEntity> taskRepository, ITaskService taskService, TaskHubContextWrapper taskHubContextWrapper)
        {
            _taskRepository = taskRepository;
            _taskService = taskService;
            _taskHubContextWrapper = taskHubContextWrapper;
        }

        public async Task<UpdateTaskResponse> Handle(UpdateTaskRequest request, CancellationToken cancellationToken)
        {
            var task = await _taskRepository.GetOne(request.Id);
            var timeForUpdateSignal = task.GetDateTimeForUpdateSignal();
            if (task == null)
            {
                return new UpdateTaskResponse()
                {
                    Status = ResponseStatus.Error,
                    Message = $"Задание с ID: {request.Id} не найдено."
                };
            }

            task.Comment = request.Comment;
            task.Direction = request.Direction;
            task.LoaderId = request.LoaderId;

            bool timeChanged = task.PlanStart.ToUnixTimeStamp() != request.PlanStartUtc
                               || task.PlanEnd.ToUnixTimeStamp() != request.PlanEndUtc;

            task.PlanStart = request.PlanStartUtc.UnixTimeStampToDateTime();
            task.PlanEnd = request.PlanEndUtc.UnixTimeStampToDateTime();

            if (timeChanged)
            {
                await _taskService.InsertTaskIntoPlanTimeline(task, true);
            }

            await _taskRepository.SaveChangesAsync(cancellationToken);
            await _taskHubContextWrapper.TasksChanged(timeForUpdateSignal);
            await _taskHubContextWrapper.TasksChanged(task.GetDateTimeForUpdateSignal());

            return new UpdateTaskResponse()
            {
                Status = ResponseStatus.Success
            };
        }
    }
}
