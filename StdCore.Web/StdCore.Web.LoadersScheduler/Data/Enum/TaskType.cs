using System.ComponentModel;

namespace Std.WebClient.Data.Enum
{
    public enum TaskType
    {
        [Description("План")]
        Plan = 1,
        [Description("ФМ")]
        Unexpected = 2,
        [Description("Перерыв")]
        Break = 3
    }
}
