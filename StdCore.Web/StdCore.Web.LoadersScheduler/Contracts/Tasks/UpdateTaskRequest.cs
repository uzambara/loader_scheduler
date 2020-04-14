using MediatR;
using Std.WebClient.Data.Enum;

namespace Std.WebClient.Contracts.Tasks
{
    public class UpdateTaskRequest: IRequest<UpdateTaskResponse>
    {
        public int Id { get; set; }
        public TaskType TaskType { get; set; }
        public int? LoaderId { get; set; }
        public long PlanStartUtc { get; set; }
        public long PlanEndUtc { get; set; }
        public long FactStartUtc { get; set; }
        public long FactEndUtc { get; set; }
        public string Comment { get; set; }
        public TaskDirection Direction { get; set; }
    }
}
