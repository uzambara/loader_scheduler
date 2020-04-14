import moment from "moment";

export type GlobalAction =
    ISetSElectedDate;

export enum GlobalActionTypes {
    SetSelectedDate = "SET_SELECTED_DATE"
}

export interface ISetSElectedDate {
    type: GlobalActionTypes.SetSelectedDate,
    payload: moment.Moment
}

export const setSelectedDate = (date: moment.Moment) => ({
    type: GlobalActionTypes.SetSelectedDate,
    payload: date
});
