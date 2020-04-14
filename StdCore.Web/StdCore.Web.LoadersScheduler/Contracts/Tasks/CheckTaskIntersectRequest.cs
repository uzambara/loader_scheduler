using MediatR;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Contracts.Tasks
{
    public class CheckTaskIntersectRequest: IRequest<CheckTaskIntersectResponse>
    {
        public int LoaderId { get; set; }
        public long StartUtc { get; set; }
        public long EndUtc { get; set; }
        public TaskType TaskType { get; set; }
    }
}
