export enum TaskType {
    Plan = 1,
    Unexpected = 2,
    Break = 3
}

export const TaskTypeName = {
    [TaskType.Plan]: "Плановая задача",
    [TaskType.Unexpected]: "ФМ",
    [TaskType.Break]: "Перерыв"
};
