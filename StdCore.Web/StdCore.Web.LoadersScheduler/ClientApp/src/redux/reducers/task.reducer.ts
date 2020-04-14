import {TaskModel} from "../../models/task.model";
import {TaskAction, TaskActionType} from "../actions/task.actions";
import {ITaskDirectionEntity} from "../../data/direction";

export interface ITaskState {
    tasksMap: Map<string, TaskModel[]>,
    taskDirections: ITaskDirectionEntity[]
}

const initialTask: ITaskState = {
    tasksMap: new Map<string, TaskModel[]>(),
    taskDirections: []
};

export const taskReducer = (state: ITaskState = initialTask, action: TaskAction) => {
    switch (action.type) {
        case TaskActionType.SetTasksByDate:
            state.tasksMap.set(action.payload.date.format("DD.MM.YYYY"), action.payload.tasks);
            return state;
        case TaskActionType.SetTaskDirections:
            return {
                ...state,
                taskDirections: action.payload
            };
        default:
            return state;
    }
};
