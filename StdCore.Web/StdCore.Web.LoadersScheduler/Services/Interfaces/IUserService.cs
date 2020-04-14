using System.Threading.Tasks;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserEntity> GetCurrentUser();
    }
}
