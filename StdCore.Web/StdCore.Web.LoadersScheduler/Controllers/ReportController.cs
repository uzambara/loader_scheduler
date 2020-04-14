using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Std.WebClient.Contracts;
using Std.WebClient.Contracts.Reports;


namespace Std.WebClient.Controllers
{
    [Authorize]
    public class ReportController: BaseController
    {
        public ReportController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost, Route(ApiRoutes.Report.TasksByDate)]
        public async Task<GetTasksByDateReportResponse> GetTasksByDateReport(GetTasksByDateReportRequest request)
        {
            var response = await Mediator.Send(request);
            return response;
        }
    }
}
