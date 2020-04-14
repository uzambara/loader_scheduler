using System.ComponentModel;

namespace Std.WebClient.Data.Enum
{
    public enum TaskWorkStatus
    {
        [Description("Новый")]
        New = 1,
        [Description("В процессе")]
        InProcess = 2,
        [Description("Выполнен")]
        Completed = 3
    }
}
