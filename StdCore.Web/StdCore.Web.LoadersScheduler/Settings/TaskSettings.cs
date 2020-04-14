using System;

namespace Std.WebClient.Settings
{
    public static class TaskSettings
    {
        private static int _minutesBetweenTasks = 5;

        public static int MinutesBetweenTasks
        {
            get => _minutesBetweenTasks;
            set => _minutesBetweenTasks = value;
        }
    }
}
