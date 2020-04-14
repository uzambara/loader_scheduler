using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Std.WebClient.Contracts;
using Std.WebClient.Contracts.Direction;

namespace Std.WebClient.Controllers
{
    public class TaskDirectionController: BaseController
    {
        protected TaskDirectionController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route(ApiRoutes.Direction.GetAll)]
        public async Task<GetTaskDirectionsResponse> GetAllTaskDirections()
        {
            return await Mediator.Send(new GetTaskDirectionsRequest());
        }
    }
}
