using MediatR;

namespace Std.WebClient.Contracts.Tasks
{
    public class CompleteTaskInProcessRequest: IRequest<CompleteTaskInProcessResponse>
    {
        public int LoaderId { get; set; }
    }
}
