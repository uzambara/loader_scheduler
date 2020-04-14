using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Std.WebClient.Contracts;
using Std.WebClient.Contracts.Tasks;
using Std.WebClient.SignalR;

namespace Std.WebClient.Controllers
{
    [Authorize]
    public class TaskController: BaseController
    {
        public TaskController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet, Route("api/task/test")]
        public string Test()
        {
            return "test";
        }

        [HttpPost, Route(ApiRoutes.Task.Create)]
        public async Task<CreateTaskResponse> Create(CreateTaskRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }

        [HttpPost, Route(ApiRoutes.Task.Delete)]
        public async Task<DeleteTaskResponse> Delete(DeleteTaskRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }

        [HttpPost, Route(ApiRoutes.Task.Update)]
        public async Task<UpdateTaskResponse> Update(UpdateTaskRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }

        [HttpPost, Route(ApiRoutes.Task.GetByDate)]
        public async Task<GetTasksByDateResponse> GetByDate(GetTasksByDateRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }

        [HttpPost, Route(ApiRoutes.Task.CheckTaskIntersect)]
        public async Task<CheckTaskIntersectResponse> CheckTaskIntersect(CheckTaskIntersectRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }

        [HttpPost, Route(ApiRoutes.Task.ChangeTaskStatus)]
        public async Task<ChangeTaskStatusResponse> ChangeTaskStatus(ChangeTaskStatusRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }

        [HttpPost, Route(ApiRoutes.Task.CompleteTaskInProcess)]
        public async Task<CompleteTaskInProcessResponse> CompleteTaskInProcess(CompleteTaskInProcessRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }
    }
}
