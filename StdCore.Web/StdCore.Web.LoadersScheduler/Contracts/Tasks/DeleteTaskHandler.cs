using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Interfaces;
using Std.WebClient.SignalR;

namespace Std.WebClient.Contracts.Tasks
{
    public class DeleteTaskHandler: IRequestHandler<DeleteTaskRequest, DeleteTaskResponse>
    {
        private readonly RepositoryBase<TaskEntity> _taskRepository;
        private readonly IUserService _userService;
        private readonly TaskHubContextWrapper _taskHubContextWrapper;

        public DeleteTaskHandler(TaskHubContextWrapper taskHubContextWrapper, RepositoryBase<TaskEntity> taskRepository, IUserService userService)
        {
            _taskHubContextWrapper = taskHubContextWrapper;
            _taskRepository = taskRepository;
            _userService = userService;
        }

        public async Task<DeleteTaskResponse> Handle(DeleteTaskRequest request, CancellationToken cancellationToken)
        {
            var task = await _taskRepository.GetOne(request.TaskId);
            var currentUser = await _userService.GetCurrentUser();
            task.DeleteUser = currentUser;
            task.Deleted = DateTime.Now;

            await _taskRepository.SaveChangesAsync(cancellationToken);
            await _taskHubContextWrapper.TasksChanged(task.GetDateTimeForUpdateSignal());
            return new DeleteTaskResponse();
        }
    }
}
