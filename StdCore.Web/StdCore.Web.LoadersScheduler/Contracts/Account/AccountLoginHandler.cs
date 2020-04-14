using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;

namespace Std.WebClient.Contracts.Account
{
    public class AccountLoginHandler: IRequestHandler<AccountLoginRequest, AccountLoginResponse>
    {
        private RepositoryBase<UserEntity> _userRepository;

        public AccountLoginHandler(RepositoryBase<UserEntity> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<AccountLoginResponse> Handle(AccountLoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetOne(u => u.Login == request.Login);
            if (user == null)
            {
                return new AccountLoginResponse()
                {
                    Status = ResponseStatus.Error,
                    Message = $"Пользователь с логином {request.Login} не зарегистрирован!"
                };
            }

            if (user.Password != request.Password)
            {
                return new AccountLoginResponse()
                {
                    Status = ResponseStatus.Error,
                    Message = "Неверный пароль!"
                };
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, request.Login)
            };

            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            return new AccountLoginResponse()
            {
                ClaimPrincipal = new ClaimsPrincipal(id),
                User = user
            };
        }
    }
}
