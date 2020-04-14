using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;

namespace Std.WebClient.Contracts.Account
{
    public class AccountRegisterHandler: IRequestHandler<AccountRegisterRequest, AccountRegisterResponse>
    {
        private RepositoryBase<UserEntity> _userRepository;

        public AccountRegisterHandler(RepositoryBase<UserEntity> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<AccountRegisterResponse> Handle(AccountRegisterRequest request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetOne(u => u.Login == request.Login);
            if (user != null)
            {
                return new AccountRegisterResponse()
                {
                    Status = ResponseStatus.Error,
                    Message = "Пользователь с таким логином уже существует!"
                };
            }
            user = new UserEntity()
            {
                Created = DateTime.Now,
                Login = request.Login,
                Password = request.Password,
                Name = request.Name,
                LastName = request.LastName
            };
            _userRepository.Add(user);

            await _userRepository.SaveChangesAsync();
            return new AccountRegisterResponse()
            {
                Status = ResponseStatus.Success
            };
        }
    }
}