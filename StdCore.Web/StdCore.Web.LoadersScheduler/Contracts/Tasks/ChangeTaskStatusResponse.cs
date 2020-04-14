using Std.WebClient.Contracts.Enum;

namespace Std.WebClient.Contracts.Tasks
{
    public class ChangeTaskStatusResponse: BaseResponse
    {
        public TasksRequestHandleResult Result { get; set; }
    }
}
