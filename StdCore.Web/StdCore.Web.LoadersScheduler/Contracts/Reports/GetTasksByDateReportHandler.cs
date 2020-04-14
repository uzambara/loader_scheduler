using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Std.Common.DateTime;
using Std.Common.Enum;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Models;
using Std.WebClient.Services.Interfaces;

namespace Std.WebClient.Contracts.Reports
{
    public class GetTasksByDateReportHandler: IRequestHandler<GetTasksByDateReportRequest, GetTasksByDateReportResponse>
    {
        private readonly ITaskService _taskService;
        private readonly TaskRepository _taskRepository;

        public GetTasksByDateReportHandler(ITaskService taskService, TaskRepository taskRepository)
        {
            _taskService = taskService;
            _taskRepository = taskRepository;
        }

        public async Task<GetTasksByDateReportResponse> Handle(GetTasksByDateReportRequest request, CancellationToken cancellationToken)
        {
            var start = request.StartTimeUtc.UnixTimeStampToDateTime();
            var end = request.EndTimeUtc.UnixTimeStampToDateTime();
            var tasks = await _taskRepository.GetTasksBetweenDates(start, end)
                .Include(t => t.CreateUser)
                .ToListAsync(cancellationToken);
            var groupByUser = tasks
                .GroupBy(t => t.CreateUser);

            var result = new GetTasksByDateReportResponse()
            {
                GroupedByUserReportRows = new Dictionary<string, IEnumerable<TasksByDateReportRow>>()
            };
            foreach (var taskEntitiesGroup in groupByUser)
            {
                var reportRows = taskEntitiesGroup
                    .Select(t => new TasksByDateReportRow()
                    {

                        Comment = t.Comment,
                        Date = t.GetFactStartIfPlanNull().ToString("dd.MM.yyyy"),
                        Direction = t.Direction.GetDescription() + t.GetReportTypeString(),
                        StartTime = t.GetFactStartIfPlanNull().ToString("HH:mm"),
                        EndTime = t.GetFactEndIfPlanNull().ToString("HH:mm"),
                        Duration = $"{t.PlanDuration().TotalHours:0.00} часа"
                    });
                result.GroupedByUserReportRows
                    .Add(taskEntitiesGroup.Key.GetFullName(), reportRows);
            }

            return result;
        }
    }
}
