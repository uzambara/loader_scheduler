using MediatR;

namespace Std.WebClient.Contracts.Tasks
{
    public class DeleteTaskRequest: IRequest<DeleteTaskResponse>
    {
        public int TaskId { get; set; }
    }
}