using System.Threading.Tasks;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Services.Implementations
{
    public interface ILoaderService
    {
        Task<TaskEntity> TaskInWork(int loaderId);
    }
}
