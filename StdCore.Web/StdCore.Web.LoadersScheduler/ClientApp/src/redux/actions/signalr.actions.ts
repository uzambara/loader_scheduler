import moment from "moment";
import {ITaskEntity} from "../../data/task";

export type SignalRAction = ITaskReceived;

export enum SignalRActionType {
    TasksReceived = "TASKS_RECEIVED"
}

export interface ITaskReceived {
    type: SignalRActionType.TasksReceived,
    payload: {
        tasks: Array<ITaskEntity>,
        date: moment.Moment
    }
}

export const TaskReceived = (tasks: Array<ITaskEntity>, date: moment.Moment): ITaskReceived => ({
    type: SignalRActionType.TasksReceived,
    payload: {
        tasks,
        date
    }
});
