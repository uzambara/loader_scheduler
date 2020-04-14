interface IAccountRoutes {
    readonly login: string;
    readonly logout: string;
    readonly register: string;
    readonly getCurrentUser: string;
}

interface ITaskRoutes {
    readonly getByDate: string;
    readonly create: string;
    readonly delete: string;
    readonly update: string;
    readonly checkTaskIntersect: string;
    readonly changeTaskStatus: string;
    readonly completeTaskInProcess: string;
}

interface IReportRoutes {
    readonly getTasksByDateReport: string
}

interface ITaskDirectionRoutes {
    readonly getAllDirections: string;
}

interface IHubRoutes {
    readonly taskHub: string;
}

export const rootPath = "/scheduler/";

export const Routes = {
    root: rootPath,
    login: `${rootPath}login`,
    calendar: `${rootPath}calendar`,
    registration: `${rootPath}registration`,
    report: `${rootPath}report`,
};
//let path = process.env.NODE_ENV === 'development' ? "http://localhost/scheduler/" : rootPath;
let path = rootPath;
console.log("path", path);
export class ApiRoutes {
    //public static Root: string = process.env.NODE_ENV === 'development' ? "http://localhost/scheduler/" : rootPath;
    public static Root: string = rootPath;
    private static apiPrefix: string = "api/";
    private static accountRoute: string = ApiRoutes.apiPrefix + "account/";
    private static directionRoute: string = ApiRoutes.apiPrefix + "direction/";
    private static taskRoute: string = ApiRoutes.apiPrefix + "task/";
    private static reportRoute: string = ApiRoutes.apiPrefix + "report/";
    public static Hubs: IHubRoutes = {
        taskHub: ApiRoutes.Root + "task-hub"
    };
    public static readonly Account: IAccountRoutes = {
        login: ApiRoutes.Root + ApiRoutes.accountRoute + "login",
        logout: ApiRoutes.Root + ApiRoutes.accountRoute + "logout",
        register: ApiRoutes.Root + ApiRoutes.accountRoute + "register",
        getCurrentUser: ApiRoutes.Root + ApiRoutes.accountRoute + "get-current-user",
    };
    public static readonly Direction: ITaskDirectionRoutes = {
        getAllDirections: ApiRoutes.Root + ApiRoutes.directionRoute + "get-all",

    };
    public static readonly Task: ITaskRoutes = {
        getByDate: ApiRoutes.Root + ApiRoutes.taskRoute + "get-by-date",
        create: ApiRoutes.Root + ApiRoutes.taskRoute + "create",
        delete: ApiRoutes.Root + ApiRoutes.taskRoute + "delete",
        update: ApiRoutes.Root + ApiRoutes.taskRoute + "update",
        checkTaskIntersect: ApiRoutes.Root + ApiRoutes.taskRoute + "check-task-intersect",
        changeTaskStatus: ApiRoutes.Root + ApiRoutes.taskRoute + "change-task-status",
        completeTaskInProcess: ApiRoutes.Root + ApiRoutes.taskRoute + "complete-task-in-process",
    };
    public static readonly Report: IReportRoutes = {
        getTasksByDateReport: ApiRoutes.Root + ApiRoutes.reportRoute + "tasks-by-date"
    }
}
