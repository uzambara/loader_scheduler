using MediatR;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Contracts.Tasks
{
    public class ChangeTaskStatusRequest: IRequest<ChangeTaskStatusResponse>
    {
        public int TaskId { get; set; }
        public int? LoaderId { get; set; }
        public TaskWorkStatus TaskStatus { get; set; }
    }
}
