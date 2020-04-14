using MediatR;

namespace Std.WebClient.Contracts.Account
{
    public class AccountRegisterRequest: IRequest<AccountRegisterResponse>
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
    }
}