using System.Security.Claims;
using Newtonsoft.Json;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Contracts.Account
{
    public class AccountLoginResponse: BaseResponse
    {
        [JsonIgnore]
        public ClaimsPrincipal ClaimPrincipal { get; set; }
        public UserEntity User { get; set; }
    }
}
