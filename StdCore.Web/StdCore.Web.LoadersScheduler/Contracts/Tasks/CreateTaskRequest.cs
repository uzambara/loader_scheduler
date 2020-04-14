using MediatR;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Contracts.Tasks
{
    public class CreateTaskRequest: IRequest<CreateTaskResponse>
    {
        public TaskType Type { get; set; }
        public int? LoaderId { get; set; }
        public long PlanStartUtc { get; set; }
        public long PlanEndUtc { get; set; }
        public string Comment { get; set; }
        public TaskDirection Direction { get; set; }
    }
}
