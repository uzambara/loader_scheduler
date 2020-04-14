using Std.WebClient.Contracts.Enum;

namespace Std.WebClient.Contracts.Tasks
{
    public class CreateTaskResponse: BaseResponse
    {
        public TasksRequestHandleResult Result { get; set; } = TasksRequestHandleResult.Success;
    }
}
