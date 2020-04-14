import {TaskStatus} from "./enum/task-status";
import {TaskType} from "./enum/task-type";
import {TaskDirectionType} from "./enum/task-direction-type";
import {UserModel} from "../models/user.model";

export interface ITaskEntity {
    id?: number,
    comment: string,
    loaderId?: number,
    status: TaskStatus,
    type: TaskType,
    planStartUtc: number,
    planEndUtc: number,
    factStartUtc?: number,
    factEndUtc?: number,
    direction: TaskDirectionType
}
