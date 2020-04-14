using System;

namespace Std.WebClient.Contracts
{
    public abstract class BaseResponse
    {
        public ResponseStatus Status { get; set; } = ResponseStatus.Success;
        public string Message { get; set; }
    }
}