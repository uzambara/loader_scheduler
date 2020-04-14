using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;
using Std.WebClient.Data.Repositories;

namespace Std.WebClient.Services.Implementations
{
    public class LoaderService : ILoaderService
    {
        private readonly RepositoryBase<TaskEntity> _taskRepository;

        public LoaderService(RepositoryBase<TaskEntity> taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<TaskEntity> TaskInWork(int loaderId)
        {
            var taskInProgress = await _taskRepository
                .GetAll(t => t.LoaderId == loaderId && t.Status == TaskWorkStatus.InProcess)
                .OrderByDescending(t => t.FactStart)
                .FirstOrDefaultAsync();

            return taskInProgress;
        }
    }
}
