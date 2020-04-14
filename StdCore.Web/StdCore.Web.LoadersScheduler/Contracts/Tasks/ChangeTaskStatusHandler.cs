using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Std.WebClient.Contracts.Enum;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Implementations;
using Std.WebClient.Services.Interfaces;
using Std.WebClient.SignalR;

namespace Std.WebClient.Contracts.Tasks
{
    public class ChangeTaskStatusHandler: IRequestHandler<ChangeTaskStatusRequest, ChangeTaskStatusResponse>
    {
        private readonly TaskRepository _taskRepository;
        private readonly TaskHubContextWrapper _taskHubContextWrapper;
        private readonly ITaskService _taskService;

        public ChangeTaskStatusHandler(TaskRepository taskRepository, TaskHubContextWrapper taskHubContextWrapper, ITaskService taskService)
        {
            _taskRepository = taskRepository;
            _taskHubContextWrapper = taskHubContextWrapper;
            _taskService = taskService;
        }

        public async Task<ChangeTaskStatusResponse> Handle(ChangeTaskStatusRequest request, CancellationToken cancellationToken)
        {
            var result = new ChangeTaskStatusResponse()
            {
                Result = TasksRequestHandleResult.Success
            };

            var task = await _taskRepository.GetOne(request.TaskId);

            switch (request.TaskStatus)
            {
                case TaskWorkStatus.InProcess:
                    result.Result = await _taskService.StartTask(task, request.LoaderId);
                    break;
                case TaskWorkStatus.Completed:
                    result.Result = await _taskService.CompleteTask(task);
                    break;
            }

            if (result.Result == TasksRequestHandleResult.Success)
            {
                await _taskRepository.SaveChangesAsync(cancellationToken);
                await _taskHubContextWrapper.TasksChanged(task.GetDateTimeForUpdateSignal());
            }
            else
            {
                if (result.Result == TasksRequestHandleResult.LoaderIsBusy)
                    result.Message = "Погрузчик занят на данный момент!";
            }


            return result;
        }
    }
}
