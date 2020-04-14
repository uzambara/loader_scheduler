using System;
using System.Net.Http;

namespace Std.Common.DateTime
{
    public static class DateTimeExtensions
    {
        private static readonly System.DateTime UnixBase = new System.DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);

        public static System.DateTime UnixTimeStampToDateTime(this long unixTimeStamp)
        {
            return UnixBase.AddMilliseconds(unixTimeStamp);
        }

        public static long ToUnixTimeStamp(this System.DateTime dateTime)
        {
            return (long)(dateTime - UnixBase).TotalMilliseconds;
        }
    }
}
