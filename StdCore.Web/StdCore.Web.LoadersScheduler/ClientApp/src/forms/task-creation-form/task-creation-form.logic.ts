import {IValid} from "../../models/common/IValid";
import {TaskModel} from "../../models/task.model";
import {TaskType} from "../../data/enum/task-type";


function validate(task: NonNullable<TaskModel>): IValid {
    let result = {
        errors: [],
        isValid: true
    };

    if(task.type == TaskType.Unexpected && !task.comment)
        result.errors.push("Необходимо указать причину");

    if(!task.direction)
        result.errors.push("Направление обязательно для заполнения");

    if(!task.loaderId && task.type != TaskType.Unexpected)
        result.errors.push("Погрузчик обязателен для заполнения");

    if(task.type !== TaskType.Unexpected && task.planEnd.isBefore(task.planStart))
        result.errors.push("Начало не может быть позже конца");

    result.isValid = result.errors.length === 0;
    return result;
}

export const taskCreationLogic = {
    validate
};
