import {TaskStatus} from "./task-status";

export enum TaskDirectionType {
    Pvh = 1,
    Metal = 2,
    Mebel = 3,
    Extruzia = 4,
    Furnitura = 5,
    Baki = 6,
    Logistic = 7
}

export const TaskDirectionTypeName = {
    [TaskDirectionType.Pvh]: "ПВХ",
    [TaskDirectionType.Metal]: "Металл",
    [TaskDirectionType.Mebel]: "Мебель",
    [TaskDirectionType.Extruzia]: "Экструзия",
    [TaskDirectionType.Furnitura]: "Фурнитура",
    [TaskDirectionType.Baki]: "Баки",
    [TaskDirectionType.Logistic]: "Логисты",
};
