using System;
using System.ComponentModel;
using System.Globalization;
using System.Linq;

namespace Std.Common.Enum
{
    public static class EnumExtensions
    {
        public static string GetDescription<T>(this T e) where T : IConvertible
        {
            if (e is System.Enum)
            {
                Type type = e.GetType();
                Array values = System.Enum.GetValues(type);
                var enumValue = e.ToInt32(CultureInfo.InvariantCulture);

                foreach (int val in values)
                {
                    if (val == enumValue)
                    {
                        var memInfo = type.GetMember(type.GetEnumName(val));
                        var descriptionAttribute = memInfo[0]
                            .GetCustomAttributes(typeof(DescriptionAttribute), false)
                            .FirstOrDefault() as DescriptionAttribute;

                        if (descriptionAttribute != null)
                        {
                            return descriptionAttribute.Description;
                        }
                    }
                }
            }

            return "";
        }
    }
}
