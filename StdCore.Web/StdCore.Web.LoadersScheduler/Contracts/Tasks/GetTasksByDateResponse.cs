using System.Collections.Generic;
using Std.WebClient.Data.Domain;
using Std.WebClient.Models;

namespace Std.WebClient.Contracts.Tasks
{
    public class GetTasksByDateResponse: BaseResponse
    {
        public IEnumerable<TaskModel> Tasks { get; set; }
    }
}
