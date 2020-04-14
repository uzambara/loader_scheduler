import {HubConnection, HubConnectionBuilder, LogLevel, IRetryPolicy, RetryContext} from "@microsoft/signalr";
import {LogUtil} from "../utils/log.util";
import {ApiRoutes} from "../routing/api-routes";

enum TaskHubMethod {
    TasksChanged = "tasks-changed"
}


class RetryPolicy implements IRetryPolicy {
    nextRetryDelayInMilliseconds(retryContext: RetryContext): number | null {
        return 5000;
    }
}

export class TaskHub {
    private static instance = new TaskHub();
    private connection: HubConnection;

    constructor() {
        if (TaskHub.instance)
            return TaskHub.instance;
        TaskHub.instance = this;

        this.connection = new HubConnectionBuilder()
            .withUrl(ApiRoutes.Hubs.taskHub)
            .withAutomaticReconnect(new RetryPolicy())
            .configureLogging(LogLevel.Error)
            .build();

        this.start();

        this.connection.onreconnected(r => LogUtil.ColorLog("TaskHub reconnected"));
    }

    private  start = async () => {
        try {
            await this.connection.start();
            LogUtil.ColorLog("TaskHub connected success");
        } catch(err) {
            LogUtil.LogError("TaskHub connection error", err);
            setTimeout(this.start, 5000);
        }
    };


    public onTasksChanged = (handle: (date: number) => void) => {
        this.connection.on(TaskHubMethod.TasksChanged, (date: number) => {
            LogUtil.Log("Tasks Changed signalR", date);
            handle(date)
        });
    }
}
