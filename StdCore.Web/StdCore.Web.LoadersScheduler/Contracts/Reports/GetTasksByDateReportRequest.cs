using System.Collections;
using System.Collections.Generic;
using MediatR;
using Std.WebClient.Models;

namespace Std.WebClient.Contracts.Reports
{
    public class GetTasksByDateReportRequest: IRequest<GetTasksByDateReportResponse>
    {
        public long StartTimeUtc { get; set; }
        public long EndTimeUtc { get; set; }
    }
}
