using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Std.Common.DateTime;
using Std.Common.Enum;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;
using Std.WebClient.Data.Repositories;

namespace Std.WebClient.Contracts.Tasks
{
    public class CheckTaskIntersectHandler: IRequestHandler<CheckTaskIntersectRequest, CheckTaskIntersectResponse>
    {
        private readonly TaskRepository _taskRepository;
        private readonly ILogger _logger;

        public CheckTaskIntersectHandler(TaskRepository taskRepository, ILogger<CheckTaskIntersectHandler> logger)
        {
            _taskRepository = taskRepository;
            _logger = logger;
        }

        public async Task<CheckTaskIntersectResponse> Handle(CheckTaskIntersectRequest request, CancellationToken cancellationToken)
        {
            var tempTask = new TaskEntity()
            {
                PlanStart = request.StartUtc.UnixTimeStampToDateTime(),
                PlanEnd = request.EndUtc.UnixTimeStampToDateTime(),
                LoaderId = request.LoaderId,
                Id = 0
            };

            IEnumerable<TaskEntity> taskWithSameLoaderAndDate = await _taskRepository
                .GetTasksWithSameDateAndLoader(request.LoaderId, request.StartUtc.UnixTimeStampToDateTime(), null)
                .ToListAsync(cancellationToken);


            var intersectedTask = taskWithSameLoaderAndDate
                .FirstOrDefault(t => t.Type == request.TaskType && t.IsIntersect(tempTask));
            if (intersectedTask != null)
            {
                _logger.LogInformation(@$"Задание для данного погрузчика на это время уже существует.
Новое задание:
    Время задания: {tempTask.PlanStart:dd.MM.yyyy HH:mm:ss}
    ИД погрузчика: {request.LoaderId}
    Тип задания: {request.TaskType.GetDescription()}
Существующее задание:
    Время задания: {intersectedTask.PlanStart:dd.MM.yyyy HH:mm:ss}
    ИД погрузчика: {intersectedTask.LoaderId}
    Тип задания: {intersectedTask.Type.GetDescription()}");
            }
            var result = new CheckTaskIntersectResponse()
            {
                TaskIntersected = intersectedTask != null
            };

            return result;
        }
    }
}
