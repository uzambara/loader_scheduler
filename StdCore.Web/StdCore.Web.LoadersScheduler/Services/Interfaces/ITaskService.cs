using System.Threading.Tasks;
using Std.WebClient.Contracts;
using Std.WebClient.Contracts.Enum;
using Std.WebClient.Contracts.Tasks;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Services.Interfaces
{
    public interface ITaskService
    {
        Task InsertTaskIntoPlanTimeline(TaskEntity task, bool pushIntersected);
        Task<TasksRequestHandleResult> StartTask(TaskEntity task, int? loaderId);
        Task<TasksRequestHandleResult> CompleteTask(TaskEntity task);
    }
}
