import {RequestUtil} from "../utils/fetch.util";
import {
    IChangeTaskStatusRequest, IChangeTaskStatusResponse,
    ICheckTaskIntersectRequest,
    ICheckTaskIntersectResponse, ICompleteTaskInProcessRequest, ICompleteTaskInProcessResponse,
    ICreateTaskRequest,
    ICreateTaskResponse, IDeleteTaskRequest, IDeleteTaskResponse, IGetTasksByDateRequest, IGetTasksByDateResponse,
    IUpdateTaskRequest,
    IUpdateTaskResponse
} from "../contracts/tasks/tasks-contract";
import {ApiRoutes} from "../routing/api-routes";

export class TaskService {
    public static async CreateTask(request: ICreateTaskRequest): Promise<ICreateTaskResponse> {
        return await RequestUtil.post<ICreateTaskResponse>(ApiRoutes.Task.create, request);
    }

    public static async UpdateTask(request: IUpdateTaskRequest): Promise<IUpdateTaskResponse> {
        return await RequestUtil.post<ICreateTaskResponse>(ApiRoutes.Task.update, request);
    }

    public static async DeleteTask(request: IDeleteTaskRequest): Promise<IDeleteTaskResponse> {
        return await RequestUtil.post<IDeleteTaskResponse>(ApiRoutes.Task.delete, request);
    }

    public static async GetByDate(request: IGetTasksByDateRequest): Promise<IGetTasksByDateResponse> {
        return await RequestUtil.post<IGetTasksByDateResponse>(ApiRoutes.Task.getByDate, request);
    }

    public static async CheckTaskIntersect(request: ICheckTaskIntersectRequest): Promise<ICheckTaskIntersectResponse> {
        return await RequestUtil.post<ICheckTaskIntersectResponse>(ApiRoutes.Task.checkTaskIntersect, request);
    }

    public static async ChangeTaskStatus(request: IChangeTaskStatusRequest): Promise<IChangeTaskStatusResponse> {
        return await RequestUtil.post<IChangeTaskStatusResponse>(ApiRoutes.Task.changeTaskStatus, request);
    }

    public static async CompleteTaskInProcess(request: ICompleteTaskInProcessRequest): Promise<ICompleteTaskInProcessResponse> {
        return await RequestUtil.post<ICompleteTaskInProcessResponse>(ApiRoutes.Task.completeTaskInProcess, request);
    }
}
