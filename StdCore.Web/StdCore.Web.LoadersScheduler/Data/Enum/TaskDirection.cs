using System.ComponentModel;

namespace Std.WebClient.Data.Enum
{
    public enum TaskDirection
    {
        [Description("ПВХ")]
        Pvh = 1,
        [Description("Металл")]
        Metal = 2,
        [Description("Мебель")]
        Mebel = 3,
        [Description("Экструзия")]
        Extruzia = 4,
        [Description("Фурнитура")]
        Furnitura = 5,
        [Description("Баки")]
        Baki = 6,
        [Description("Логисты")]
        Logistic = 7
    }
}
