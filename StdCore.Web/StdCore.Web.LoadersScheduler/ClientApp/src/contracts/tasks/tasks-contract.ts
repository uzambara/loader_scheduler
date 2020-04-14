import {IBaseRequest} from "../base-request";
import {IBaseResponse} from "../base-response";
import {TasksRequestHandleResult} from "../enum/tasks-request-handle-result";
import {ITaskEntity} from "../../data/task";
import {TaskStatus} from "../../data/enum/task-status";
import {TaskType} from "../../data/enum/task-type";
import {ITaskModel} from "../../models/task.model";


export interface ICreateTaskRequest extends NonNullable<ITaskEntity>, IBaseRequest {
}

export interface ICreateTaskResponse extends IBaseResponse {
    result: TasksRequestHandleResult
}

export interface IDeleteTaskRequest extends IBaseRequest {
    taskId: number
}

export interface IDeleteTaskResponse extends IBaseResponse {

}

export interface IGetTasksByDateRequest extends IBaseRequest {
    date: number
}

export interface IGetTasksByDateResponse extends IBaseResponse {
    tasks: Array<ITaskModel>
}

export interface IUpdateTaskRequest extends IBaseRequest, ITaskEntity {
}

export interface IUpdateTaskResponse extends IBaseResponse {

}

export interface ICheckTaskIntersectRequest extends IBaseRequest {
    loaderId: number,
    startUtc: number,
    endUtc: number,
    taskType: TaskType
}

export interface ICheckTaskIntersectResponse extends IBaseResponse {
    taskIntersected: boolean
}

export interface IChangeTaskStatusRequest extends IBaseRequest {
    taskId: number,
    loaderId?: number,
    taskStatus: TaskStatus
}

export interface IChangeTaskStatusResponse extends IBaseResponse {
    result: TasksRequestHandleResult
}

export interface ICompleteTaskInProcessRequest extends IBaseRequest {
    loaderId: number
}

export interface ICompleteTaskInProcessResponse extends IBaseResponse {

}
