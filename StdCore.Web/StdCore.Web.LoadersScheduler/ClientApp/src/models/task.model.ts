import moment from "moment";
import {ITaskEntity} from "../data/task";
import {IUserEntity} from "../data/user";
import {TaskStatus} from "../data/enum/task-status";
import {TaskType} from "../data/enum/task-type";
import {TaskDirectionType} from "../data/enum/task-direction-type";
import {IUserModel} from "./user.model";

export interface ITaskModel {
    id: number,
    direction: TaskDirectionType,
    loaderId: number,
    planStartUtc: number,
    planEndUtc: number,
    factStartUtc: number,
    factEndUtc: number,
    createdUtc: number,
    status: TaskStatus,
    type: TaskType,
    comment: string,
    createUser: IUserModel
}

export class TaskModel implements Omit<ITaskModel, "planStartUtc" | "planEndUtc" | "factStartUtc" | "factEndUtc"> {
    comment: string;

    factEnd: moment.Moment;
    factStart: moment.Moment;
    planEnd: moment.Moment;
    planStart: moment.Moment;
    createUser: IUserEntity;

    id: number;
    loaderId: number;
    status: TaskStatus;
    type: TaskType;
    direction: TaskDirectionType;

    constructor() {
        this.planStart = moment();
        this.planEnd = moment().add(30, "minutes");
    }

    createdUtc: number;
}
