using System.Collections.Generic;
using Std.WebClient.Data.Domain;

namespace Std.WebClient.Contracts.Direction
{
    public class GetTaskDirectionsResponse: BaseResponse
    {
        public IEnumerable<TaskDirectionEntity> Directions { get; set; }
    }
}
