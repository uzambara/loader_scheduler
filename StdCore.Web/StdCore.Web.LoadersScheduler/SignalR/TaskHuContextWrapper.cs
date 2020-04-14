using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Std.Common.DateTime;

namespace Std.WebClient.SignalR
{
    public class TaskHubContextWrapper
    {
        private IHubContext<TaskHub> _hubContext;

        public TaskHubContextWrapper(IHubContext<TaskHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task TasksChanged(DateTime date)
        {
            await _hubContext.Clients.All.SendAsync("tasks-changed", date.ToUnixTimeStamp());
        }
    }
}
