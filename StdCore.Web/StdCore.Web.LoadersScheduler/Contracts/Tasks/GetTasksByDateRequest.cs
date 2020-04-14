using MediatR;

namespace Std.WebClient.Contracts.Tasks
{
    public class GetTasksByDateRequest: IRequest<GetTasksByDateResponse>
    {
        public long Date { get; set; }
    }
}