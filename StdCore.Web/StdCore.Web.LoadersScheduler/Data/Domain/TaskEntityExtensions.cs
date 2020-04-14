using System;
using Std.Common.Enum;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Data.Domain
{
    public static class TaskEntityExtensions
    {
        public static bool IsIntersect(this TaskEntity task, TaskEntity otherTask)
        {
            // Пересечение тогда, когда начало или конец задания находится между началом и концом другого задания.
            return task.PlanStart >= otherTask.PlanStart && task.PlanStart <= otherTask.PlanEnd
                   || otherTask.PlanStart >= task.PlanStart && otherTask.PlanStart <= task.PlanEnd
                   || task.PlanEnd >= otherTask.PlanStart && task.PlanEnd <= otherTask.PlanEnd
                   || otherTask.PlanEnd >= task.PlanStart && otherTask.PlanEnd <= task.PlanEnd;
        }

        public static bool StartsBefore(this TaskEntity task, TaskEntity otherTask)
        {
            return task.PlanStart < otherTask.PlanEnd;
        }

        public static TimeSpan PlanDuration(this TaskEntity task)
        {
            if (task.FactStart.HasValue && task.FactEnd.HasValue)
            {
                return task.FactEnd.Value - task.FactStart.Value;
            }
            return task.PlanEnd - task.PlanStart;
        }

        public static DateTime GetDateTimeForUpdateSignal(this TaskEntity task)
        {
            return task.FactStart ?? task.PlanStart;
        }

        public static DateTime GetFactStartIfPlanNull(this TaskEntity task)
        {
            return task.FactStart ?? task.PlanStart;
        }

        public static DateTime GetFactEndIfPlanNull(this TaskEntity task)
        {
            return task.FactEnd ?? task.PlanEnd;
        }

        public static string GetReportTypeString(this TaskEntity task)
        {
            if (task.Type == TaskType.Unexpected && task.Direction != TaskDirection.Baki &&
                task.Direction != TaskDirection.Logistic)
                return $"({task.Type.GetDescription()})";

            return String.Empty;
        }

        public static void MoveToTime(this TaskEntity task, DateTime dateTime)
        {
            var duration = task.PlanDuration();
            task.PlanStart = dateTime;
            task.PlanEnd = task.PlanStart + duration;
        }
    }
}
