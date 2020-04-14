import moment from "moment";
import {TaskModel} from "../models/task.model";
import {
    IChangeTaskStatusRequest,
    ICheckTaskIntersectRequest, ICompleteTaskInProcessRequest,
    ICreateTaskRequest, IDeleteTaskRequest,
    IGetTasksByDateRequest,
    IUpdateTaskRequest
} from "../contracts/tasks/tasks-contract";
import {dateTimeUtils} from "../utils/date-time.utils";
import {TaskStatus} from "../data/enum/task-status";
import {TaskType} from "../data/enum/task-type";


export class TaskRequestFactory {
    public static GetCreateTaskRequest(task: NonNullable<TaskModel>): ICreateTaskRequest {
        return {
            ...task,
            planStartUtc: dateTimeUtils.dateTimeToUnix(task.planStart),
            planEndUtc: dateTimeUtils.dateTimeToUnix(task.planEnd),
            status: TaskStatus.New
        }
    }

    public static GetUpdateTaskRequest(task: TaskModel): IUpdateTaskRequest {
        return {
            ...task,
            planStartUtc: dateTimeUtils.dateTimeToUnix(task.planStart),
            planEndUtc: dateTimeUtils.dateTimeToUnix(task.planEnd)
        }
    }

    public static GetDeleteTaskRequest(taskId: number): IDeleteTaskRequest {
        return {
            taskId
        }
    }

    public static GetGetByDateRequest(date: moment.Moment): IGetTasksByDateRequest {
        return {
            date: dateTimeUtils.dateTimeToUnix(date)
        }
    }

    public static GetCheckTaskIntersectRequest(loaderId: number, start: moment.Moment, end: moment.Moment, taskType: TaskType): ICheckTaskIntersectRequest {
        return {
            loaderId: loaderId,
            startUtc: dateTimeUtils.dateTimeToUnix(start),
            endUtc: dateTimeUtils.dateTimeToUnix(end),
            taskType: taskType
        }
    }

    public static GetChangeTaskStatusRequest(taskId: number, taskStatus: TaskStatus, loaderId?: number): IChangeTaskStatusRequest {
        return {
            loaderId: loaderId,
            taskId: taskId,
            taskStatus: taskStatus
        }
    }

    public static GetCompleteTaskInProcessRequest(loaderId: number): ICompleteTaskInProcessRequest {
        return {
            loaderId: loaderId,
        }
    }
}
