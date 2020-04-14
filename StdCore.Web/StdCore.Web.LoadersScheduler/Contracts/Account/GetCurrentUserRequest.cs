using MediatR;

namespace Std.WebClient.Contracts.Account
{
    public class GetCurrentUserRequest: IRequest<GetCurrentUserResponse>
    {
    }
}
