using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Std.WebClient.Contracts.Account
{
    public class AccountLogoutHandler: IRequestHandler<AccountLogoutRequest, AccountLogoutResponse>
    {
        public Task<AccountLogoutResponse> Handle(AccountLogoutRequest request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new AccountLogoutResponse());
        }
    }
}