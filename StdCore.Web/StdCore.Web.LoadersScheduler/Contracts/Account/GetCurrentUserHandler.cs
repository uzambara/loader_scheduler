using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Std.WebClient.Data.Domain;
using Std.WebClient.Data.Repositories;
using Std.WebClient.Services.Implementations;
using Std.WebClient.Services.Interfaces;

namespace Std.WebClient.Contracts.Account
{
    public class GetCurrentUserHandler: IRequestHandler<GetCurrentUserRequest, GetCurrentUserResponse>
    {
        private readonly IUserService _userService;

        public GetCurrentUserHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<GetCurrentUserResponse> Handle(GetCurrentUserRequest request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetCurrentUser();

            return new GetCurrentUserResponse()
            {
                User = user
            };
        }
    }
}
