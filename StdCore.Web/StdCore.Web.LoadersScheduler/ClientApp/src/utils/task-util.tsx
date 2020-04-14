import {TaskColor} from "../enum/task-color";
import {TaskModel} from "../models/task.model";
import React from "react";
import {TaskDirectionType, TaskDirectionTypeName} from "../data/enum/task-direction-type";
import {TaskStatus} from "../data/enum/task-status";
import {TaskType} from "../data/enum/task-type";
import moment from "moment";
import {dateTimeUtils} from "./date-time.utils";


export class TaskUtil {
    public static getPlanTopOffset = (task: TaskModel, minuteHeight: number, startOfScaleTimeInHours: number): number => {
        return dateTimeUtils.getPixelOffset(task.planStart, minuteHeight, startOfScaleTimeInHours);
    };

    public static getFactTopOffset = (task: TaskModel, minuteHeight: number, startOfScaleTimeInHours: number): number => {
        return dateTimeUtils.getPixelOffset(task.factStart, minuteHeight, startOfScaleTimeInHours);
    };

    public static getPlanHeight = (task: TaskModel, minuteHeight: number): number => {
        return task.planEnd.diff(task.planStart, "minute") * minuteHeight;
    };

    public static getFactHeight = (task: TaskModel, minuteHeight: number): number => {
        let now = moment();
        let end = task.factEnd
            ? task.factEnd
            : moment(task.factStart).set({
                hour: now.hour(),
                minute: now.minute(),
                second: now.second()
            });

        if(end.diff(task.factStart, "minute") < 15) {
            end = task.factStart.clone().add(15, "minute");
        }
        return end.diff(task.factStart, "minute") * minuteHeight;
    };

    public static getShortInfo = (task: TaskModel) => {
        return <React.Fragment>
            {TaskDirectionTypeName[task.direction]}
        </React.Fragment>
    };

    public static getStatusString = (task: TaskModel) => {
        switch (task.status) {
            case TaskStatus.New:
                return "Новый";
            case TaskStatus.InProcess:
                return "В работе";
            case TaskStatus.Completed:
                return "Завершен";
            default:
                return "";
        }
    };

    public static getFullInfo = (task: TaskModel) => {
        return <React.Fragment>
            ИД: {task.id}<br/>
            Напрвление: {TaskDirectionTypeName[task.direction]}<br/>
            План: {task.planStart.format("HH:mm")}-{task.planEnd.format("HH:mm")}<br/>
            Факт: {task.factStart && task.factStart.format("HH:mm") || ""}-{task.factEnd && task.factEnd.format("HH:mm") || ""}<br/>
            Комментарий: {task.comment}<br/>
            Создал: {task.createUser && `${task.createUser.lastName} ${task.createUser.name}`}<br/>
        </React.Fragment>
    };

    public static getColor(task: TaskModel): string {
        switch (task.type) {
            case TaskType.Plan:
                switch(task.direction) {
                    case TaskDirectionType.Pvh:
                        return TaskColor.Pvh;
                    case TaskDirectionType.Metal:
                        return TaskColor.Metal;
                    case TaskDirectionType.Mebel:
                        return TaskColor.Mebel;
                    case TaskDirectionType.Extruzia:
                        return TaskColor.Extruzia;
                    case TaskDirectionType.Furnitura:
                        return TaskColor.Furnitura;
                    case TaskDirectionType.Baki:
                        return TaskColor.Baki;
                    case TaskDirectionType.Logistic:
                        return TaskColor.Logistic;
                    default:
                        return TaskColor.UnexpectedTask;
                }
            case TaskType.Unexpected:
                switch (task.direction) {
                    case TaskDirectionType.Baki:
                        return TaskColor.Baki;
                    case TaskDirectionType.Logistic:
                        return TaskColor.Logistic;
                }
                return TaskColor.UnexpectedTask;
        }
    }
}
