import moment from "moment";
import {TaskModel} from "../../models/task.model";
import {TaskFactory} from "../../factories/task-factory";
import {Dispatch} from "redux";
import {IGlobalState} from "../reducers";
import {TaskRequestFactory} from "../../factories/task-request-factory";
import {TaskService} from "../../services/task.service";
import {setGlobalProcessing} from "./global-processing.action";
import {ProcessingStatus} from "../../enum/processing-type";
import {dispatchResponse} from "./index";
import {ThunkDispatch} from "redux-thunk";
import {TaskDirectionService} from "../../services/task-direction.service";
import {TasksRequestHandleResult} from "../../contracts/enum/tasks-request-handle-result";
import {TaskStatus} from "../../data/enum/task-status";
import {ITaskEntity} from "../../data/task";
import {ITaskDirectionEntity} from "../../data/direction";
import {ICreateTaskRequest} from "../../contracts/tasks/tasks-contract";
import {ResponseStatus} from "../../contracts/response-status";

export const getTasksByDate = (date?: moment.Moment, allowCached: boolean = true) => async (dispatch: Dispatch, getState: () => IGlobalState) => {
    const state = getState();
    const selectedDate = date || state.selectedDate;
    const dateKey = selectedDate.format("DD.MM.YYYY");

    const cachedTasks = state.tasks.tasksMap.get(dateKey);
    // Если нужны не закэшированные данные
    if(!allowCached || !cachedTasks) {
        const request = TaskRequestFactory.GetGetByDateRequest(selectedDate);
        dispatch(setGlobalProcessing({
            loadingMessage: "Загрузка...",
            processingStatus: ProcessingStatus.Progress
        }));

        const response = await TaskService.GetByDate(request);
        dispatchResponse(response, setTasksByDate(date, response.tasks), dispatch);
    }
};

export const createTask = (task: TaskModel) => async (dispatch: Dispatch) => {
    const request = TaskRequestFactory.GetCreateTaskRequest(task);
    const response = await TaskService.CreateTask(request as ICreateTaskRequest);
    if(response.status != ResponseStatus.Success)
    {
        console.log(response.message);
    }
    if(response.result != TasksRequestHandleResult.Success) {
        dispatch(setGlobalProcessing({
            processingStatus: ProcessingStatus.DialogMessage,
            dialogMessage: response.message
        }));
    }
};

export const deleteTask = (id: number) => async (dispatch: Dispatch) => {
    const request = TaskRequestFactory.GetDeleteTaskRequest(id);
    const response = await TaskService.DeleteTask(request);
    dispatchResponse(response, null, dispatch);
};

export const changeTaskStatus = (taskId: number, status: TaskStatus, loaderId?: number) => async (dispatch: Dispatch) => {
    const request = TaskRequestFactory.GetChangeTaskStatusRequest(taskId, status, loaderId);
    const response = await TaskService.ChangeTaskStatus(request);

    if(response.result == TasksRequestHandleResult.LoaderIsBusy) {
        dispatch(setGlobalProcessing({
            processingStatus: ProcessingStatus.DialogMessage,
            dialogMessage: response.message
        }));
    }
};

export const completeTaskInProcess = (loaderId: number) => async (dispatch: Dispatch) => {
    const request = TaskRequestFactory.GetCompleteTaskInProcessRequest(loaderId);
    const response = await TaskService.CompleteTaskInProcess(request);
};

export const getTaskDirectionsRemote = () => async (dispatch: ThunkDispatch<IGlobalState, any, any>) => {
    const response = await TaskDirectionService.GetAllTaskDirections();
    dispatchResponse(response, setTaskDirections(response.directions), dispatch);
};

export type TaskAction =
    ISetTasksByDate
    | ISetTaskDirections;

export enum TaskActionType {
    SetTasksByDate = "SET_TASKS_BY_DATE",
    SetTaskDirections = "SET_TASK_DIRECTIONS"
}

export interface ISetTasksByDate {
    type: TaskActionType.SetTasksByDate,
    payload: {
        tasks: TaskModel[],
        date: moment.Moment
    }
}

export const setTasksByDate = (date: moment.Moment, tasks: ITaskEntity[]): ISetTasksByDate => ({
    type: TaskActionType.SetTasksByDate,
    payload: {
        tasks: tasks.map(task => TaskFactory.CreateTaskModel(task)),
        date: date
    }
});

export interface ISetTaskDirections {
    type: TaskActionType.SetTaskDirections,
    payload: ITaskDirectionEntity[]
}

export const setTaskDirections = (directions: ITaskDirectionEntity[]): ISetTaskDirections => ({
    type: TaskActionType.SetTaskDirections,
    payload: directions
});
