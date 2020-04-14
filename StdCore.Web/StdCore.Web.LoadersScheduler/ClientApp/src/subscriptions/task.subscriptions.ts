import {Dispatch} from "redux";
import {TaskHub} from "../hubs/task.hub";
import {ThunkDispatch} from "redux-thunk"
import {AnyAction} from "redux";
import {dateTimeUtils} from "../utils/date-time.utils";
import {getTasksByDate} from "../redux/actions/task.actions";
import {IGlobalState} from "../redux/reducers";
import {LogUtil} from "../utils/log.util";

export class TaskSubscriptionInitializer {
    private static instance: TaskSubscriptionInitializer;
    private _dispatch: ThunkDispatch<IGlobalState, any, AnyAction>;
    private _taskHub: TaskHub;
    constructor(dispatch: Dispatch) {
        if (TaskSubscriptionInitializer.instance)
            return TaskSubscriptionInitializer.instance;

        TaskSubscriptionInitializer.instance = this;

        this._dispatch = dispatch;
        this._taskHub = new TaskHub();
    }

    public initialize() {
        this._taskHub.onTasksChanged(this.onTasksChanged);
    }
    
    private onTasksChanged = (unixDate: number) => {
        LogUtil.Log("Пришло сообщение об изменении заданий на дату!", dateTimeUtils.unixToDateTime(unixDate).format("DD.MM.YYYY HH:mm"));
        const date = dateTimeUtils.unixToDateTime(unixDate);
        this._dispatch(getTasksByDate(date, false));
    }
}
