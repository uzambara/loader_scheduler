using Std.WebClient.Data.Domain;

namespace Std.WebClient.Contracts.Account
{
    public class GetCurrentUserResponse
    {
        public UserEntity User { get; set; }
    }
}
