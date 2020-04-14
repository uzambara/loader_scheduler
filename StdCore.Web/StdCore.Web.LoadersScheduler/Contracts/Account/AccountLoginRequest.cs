using MediatR;

namespace Std.WebClient.Contracts.Account
{
    public class AccountLoginRequest: IRequest<AccountLoginResponse>
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string ReturnUrl { get; set; }
    }
}
