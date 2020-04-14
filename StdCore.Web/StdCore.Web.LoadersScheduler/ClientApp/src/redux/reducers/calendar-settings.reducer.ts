import {ICalendarSettings} from "../../settings/calendar.settings";
import {AnyAction} from "redux";

const initialState: ICalendarSettings = {
    hoursCount: 24,
    loaders: [
        {id: 1, name: "Погрузчик 1"},
        {id: 2, name: "Погрузчик 2"}
    ],
    minuteHeight: 0.8,
    rowHeight: 0.8 * 60,
    startOfScaleTime: 0
};

export const calendarSettingsReducer = (state: ICalendarSettings = initialState, action: AnyAction): ICalendarSettings => {
    return state;
};
