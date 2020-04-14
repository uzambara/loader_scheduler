using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Implementations;
using Std.WebClient.SignalR;

namespace Std.WebClient.Contracts.Tasks
{
    public class CompleteTaskInProcessHandler: IRequestHandler<CompleteTaskInProcessRequest, CompleteTaskInProcessResponse>
    {
        private readonly ILoaderService _loaderService;
        private readonly RepositoryBase<LoaderEntity> _loaderRepository;
        private readonly TaskHubContextWrapper _taskHubContextWrapper;

        public CompleteTaskInProcessHandler(
            ILoaderService loaderService,
            RepositoryBase<LoaderEntity> loaderRepository,
            TaskHubContextWrapper taskHubContextWrapper)
        {
            _loaderService = loaderService;
            _loaderRepository = loaderRepository;
            _taskHubContextWrapper = taskHubContextWrapper;
        }

        public async Task<CompleteTaskInProcessResponse> Handle(CompleteTaskInProcessRequest request, CancellationToken cancellationToken)
        {
            var taskInProcess = await _loaderService.TaskInWork(request.LoaderId);
            if (taskInProcess != null)
            {
                taskInProcess.Status = TaskWorkStatus.Completed;
                taskInProcess.FactEnd = DateTime.Now;
                await _loaderRepository.SaveChangesAsync(cancellationToken);
                await _taskHubContextWrapper.TasksChanged(taskInProcess.GetDateTimeForUpdateSignal());
            }

            return new CompleteTaskInProcessResponse();
        }
    }
}
