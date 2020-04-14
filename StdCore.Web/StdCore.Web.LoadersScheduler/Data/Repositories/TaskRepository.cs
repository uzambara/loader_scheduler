using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Data.Repositories
{
    public class TaskRepository: RepositoryBase<TaskEntity>
    {
        public TaskRepository(SchedulerDbContext context) : base(context)
        {
        }

        public IQueryable<TaskEntity> GetTasksBetweenDates(DateTime start, DateTime end)
        {
            return _context.Set<TaskEntity>()
                .Include(e => e.CreateUser)
                .Where(t =>
                    ((t.PlanStart >= start
                        && t.PlanEnd <= end)
                    ||
                    (t.FactStart >= start
                        && t.FactEnd <= end))
                    && t.Deleted == null);
        }
        public IQueryable<TaskEntity> GetTasksWithSameDateAndLoader(int? loaderId, DateTime planStart, int? taskId)
        {
            return _context.Set<TaskEntity>()
                .Where(t =>
                    t.PlanStart.Date == planStart.Date
                    && t.LoaderId == loaderId
                    && t.Deleted == null
                    && t.Id != taskId);
        }

        public async Task<bool> TaskInProcessExists(int loaderId, DateTime startTime)
        {
            var taskInProcess = await _context.Set<TaskEntity>()
                .FirstOrDefaultAsync(t => t.LoaderId == loaderId
                            && t.Status == TaskWorkStatus.InProcess
                            && t.Deleted == null
                            && t.FactStart.Value.Date == startTime.Date);

            return taskInProcess != null;
        }
    }
}
