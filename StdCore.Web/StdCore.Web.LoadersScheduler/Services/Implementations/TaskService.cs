using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Std.WebClient.Contracts;
using Std.WebClient.Contracts.Enum;
using Std.WebClient.Contracts.Tasks;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Interfaces;
using Std.WebClient.Settings;

namespace Std.WebClient.Services.Implementations
{
    public class TaskService: ITaskService
    {
        private TaskRepository _taskRepository;
        public TaskService(TaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task InsertTaskIntoPlanTimeline(TaskEntity task, bool pushIntersected)
        {
            // Находим все задания за тот же день с тем же погрузчиком.
            var taskWithSameDateAndLoader = await _taskRepository
                .GetTasksWithSameDateAndLoader(task.LoaderId, task.PlanStart, task.Id)
                .OrderBy(t => t.PlanStart)
                .ToListAsync();

            // Если нет заданий в этот же день с таким же погрузчиком,
            // то ничего не меняем, оставляем как есть.
            if (taskWithSameDateAndLoader.Count == 0)
                return;

            // Находим пересечение с каким либо заданием
            var intersectedTasks = taskWithSameDateAndLoader
                .Where(t => t.IsIntersect(task))
                .ToList();

            // Если нет пересечений, то ничего не меняем, оставляем как есть.
            if (!intersectedTasks.Any())
                return;

            var intersectedIndex = taskWithSameDateAndLoader.IndexOf(intersectedTasks.First());

            var insertIndex = pushIntersected
                ? intersectedIndex
                : intersectedIndex + 1;

            taskWithSameDateAndLoader.Insert(insertIndex, task);

            for (; intersectedIndex < taskWithSameDateAndLoader.Count - 1; intersectedIndex++)
            {
                var  current = taskWithSameDateAndLoader[intersectedIndex];
                var next = taskWithSameDateAndLoader[intersectedIndex + 1];
                // Если следующая начинается раньше текущей
                if (next.StartsBefore(current))
                {
                    // Сдвигаем следующую
                    next.MoveToTime(current.PlanEnd.AddMinutes(TaskSettings.MinutesBetweenTasks));
                }
            }

            return;
        }
        public async Task<TasksRequestHandleResult> StartTask(TaskEntity task, int? loaderId)
        {
            if (task.Type == TaskType.Unexpected && loaderId == null)
                return TasksRequestHandleResult.LoaderIdRequired;

            var taskInProcessExists = await _taskRepository
                .TaskInProcessExists(loaderId.Value, DateTime.Now);

            if (taskInProcessExists)
            {
                return TasksRequestHandleResult.LoaderIsBusy;
            }
            task.Status = TaskWorkStatus.InProcess;
            task.FactStart = DateTime.Now;

            if (task.Type == TaskType.Unexpected)
                task.LoaderId = loaderId;

            return TasksRequestHandleResult.Success;
        }
        public Task<TasksRequestHandleResult> CompleteTask(TaskEntity task)
        {
            task.Status = TaskWorkStatus.Completed;
            task.FactEnd = DateTime.Now;

            return Task.FromResult(TasksRequestHandleResult.Success);
        }
    }
}
