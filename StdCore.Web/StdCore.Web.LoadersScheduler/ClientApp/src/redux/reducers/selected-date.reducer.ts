import moment from "moment";
import {AnyAction} from "redux";
import {GlobalAction, GlobalActionTypes} from "../actions/global.actions";

export const selectedDateReducer = (state: moment.Moment = moment(), action: AnyAction & GlobalAction): moment.Moment => {
    if(action.type == GlobalActionTypes.SetSelectedDate) {
        return action.payload
    }
    return state;
};
