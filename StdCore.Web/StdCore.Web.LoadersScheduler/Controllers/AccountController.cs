using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Std.WebClient.Contracts;
using Std.WebClient.Contracts.Account;

namespace Std.WebClient.Controllers
{
    [Authorize]
    public class AccountController: BaseController
    {
        public AccountController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet]
        [Route(ApiRoutes.Account.GetCurrentUser)]
        [AllowAnonymous]
        public async Task<GetCurrentUserResponse> GetCurrentUser()
        {
            var response = await Mediator.Send(new GetCurrentUserRequest());

            return response;
        }

        [HttpPost]
        [Route(ApiRoutes.Account.Register)]
        [AllowAnonymous]
        public async Task<AccountRegisterResponse> Register(AccountRegisterRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }

        [HttpPost]
        [Route(ApiRoutes.Account.Login)]
        [AllowAnonymous]
        public async Task<AccountLoginResponse> Login(AccountLoginRequest request)
        {
            var response = await Mediator.Send(request);
            if(response.Status == ResponseStatus.Success)
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, response.ClaimPrincipal);

            return response;
        }

        [HttpPost]
        [Route(ApiRoutes.Account.Logout)]
        public async Task<AccountLogoutResponse> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return new AccountLogoutResponse();
        }
    }
}
