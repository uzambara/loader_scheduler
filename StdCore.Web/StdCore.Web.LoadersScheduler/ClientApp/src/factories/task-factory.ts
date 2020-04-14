import {TaskModel} from "../models/task.model";
import {dateTimeUtils} from "../utils/date-time.utils";
import {ITaskEntity} from "../data/task";

export class TaskFactory {
    public static CreateTaskModel(task: ITaskEntity): TaskModel {
        let result = Object.assign(new TaskModel, task);

        result.planStart = dateTimeUtils.unixToDateTime(task.planStartUtc);
        result.planEnd = dateTimeUtils.unixToDateTime(task.planEndUtc);
        result.factStart = task.factStartUtc && dateTimeUtils.unixToDateTime(task.factStartUtc);
        result.factEnd = task.factEndUtc && dateTimeUtils.unixToDateTime(task.factEndUtc);

        return result;
    }
}
