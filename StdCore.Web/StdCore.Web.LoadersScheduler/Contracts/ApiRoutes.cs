namespace Std.WebClient.Contracts
{
    public static class ApiRoutes
    {
        public const string Root = "api/";
        public static class Account
        {
            private const string ControllerRoute = "account/";
            public const string Login = Root + ControllerRoute + "login";
            public const string Logout = Root + ControllerRoute + "logout";
            public const string Register = Root + ControllerRoute + "register";
            public const string GetCurrentUser = Root + ControllerRoute + "get-current-user";
        }

        public static class Task
        {
            private const string ControllerRoute = "task/";
            public const string GetByDate = Root + ControllerRoute + "get-by-date";
            public const string Create = Root + ControllerRoute + "create";
            public const string Delete = Root + ControllerRoute + "delete";
            public const string Update = Root + ControllerRoute + "update";
            public const string CheckTaskIntersect = Root + ControllerRoute + "check-task-intersect";
            public const string ChangeTaskStatus = Root + ControllerRoute + "change-task-status";
            public const string CompleteTaskInProcess = Root + ControllerRoute + "complete-task-in-process";
        }

        public static class Direction
        {
            private const string ControllerRoute = "direction/";
            public const string GetAll = Root + ControllerRoute + "get-all";
        }

        public static class Report
        {
            private const string ControllerRoute = "report/";
            public const string TasksByDate = Root + ControllerRoute + "tasks-by-date";
        }
    }
}
