using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Std.Common.DateTime;
using Std.WebClient.Contracts.Enum;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Implementations;
using Std.WebClient.Services.Interfaces;
using Std.WebClient.SignalR;

namespace Std.WebClient.Contracts.Tasks
{
    public class CreateTaskHandler: IRequestHandler<CreateTaskRequest, CreateTaskResponse>
    {
        private readonly TaskRepository _taskRepository;
        private readonly ITaskService _taskService;
        private readonly IUserService _userService;
        private readonly ILoaderService _loaderService;
        private readonly TaskHubContextWrapper _taskHubContextWrapper;

        public CreateTaskHandler(
            TaskRepository taskContext,
            ITaskService taskService,
            IUserService userService,
            ILoaderService loaderService,
            TaskHubContextWrapper taskHubContextWrapper)
        {
            _taskRepository = taskContext;
            _taskService = taskService;
            _userService = userService;
            _loaderService = loaderService;
            _taskHubContextWrapper = taskHubContextWrapper;
        }

        public async Task<CreateTaskResponse> Handle(CreateTaskRequest request, CancellationToken cancellationToken)
        {
            var currentUser = await _userService.GetCurrentUser();
            var planStart = request.PlanStartUtc.UnixTimeStampToDateTime();
            var planEnd = request.Type == TaskType.Unexpected
                ? planStart.AddHours(1)
                : request.PlanEndUtc.UnixTimeStampToDateTime();
            var task = new TaskEntity()
            {
                Created = DateTime.Now,
                LoaderId = request.LoaderId,
                Status = TaskWorkStatus.New,
                Comment = request.Comment,
                Type = request.Type,
                PlanStart = planStart,
                PlanEnd = planEnd,
                Direction = request.Direction,
                CreateUser = currentUser
            };
            // Баки и логисты создаются сразу в статусе InProcess
            if (request.Direction == TaskDirection.Baki || request.Direction == TaskDirection.Logistic)
            {
                var taskInWork = await _loaderService.TaskInWork(request.LoaderId.Value);
                if (taskInWork != null)
                {
                    return new CreateTaskResponse()
                    {
                        Result = TasksRequestHandleResult.LoaderIsBusy,
                        Message = $"У погрузчика есть незавершенное задание: {taskInWork.FactStart.Value.ToString("dd.mm.yyyy HH:mm")}"
                    };
                }

                task.Status = TaskWorkStatus.InProcess;
                task.FactStart = DateTime.Now;
                task.PlanStart = 0L.UnixTimeStampToDateTime();
                task.PlanEnd = 0L.UnixTimeStampToDateTime();
            }

            await _taskService.InsertTaskIntoPlanTimeline(task, false);
            _taskRepository.Add(task);
            await _taskRepository.SaveChangesAsync(cancellationToken);
            await _taskHubContextWrapper.TasksChanged(task.GetDateTimeForUpdateSignal());
            return new CreateTaskResponse();
        }
    }
}
