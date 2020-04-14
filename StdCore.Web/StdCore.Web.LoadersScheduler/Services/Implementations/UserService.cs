using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Interfaces;

namespace Std.WebClient.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly RepositoryBase<UserEntity> _userRepository;

        public UserService(IHttpContextAccessor httpContextAccessor, RepositoryBase<UserEntity> userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<UserEntity> GetCurrentUser()
        {
            var currentUserName = _httpContextAccessor.HttpContext.User.Identity.Name;
            return await _userRepository.GetOne(u => u.Login == currentUserName);
        }
    }
}
