using System.Collections.Generic;
using Std.WebClient.Models;

namespace Std.WebClient.Contracts.Reports
{
    public class GetTasksByDateReportResponse
    {
        public Dictionary<string, IEnumerable<TasksByDateReportRow>> GroupedByUserReportRows { get; set; }
    }
}
