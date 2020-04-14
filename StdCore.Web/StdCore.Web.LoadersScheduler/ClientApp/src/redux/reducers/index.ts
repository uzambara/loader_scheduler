import {authorizeReducer, IAuthorizeState} from "./authorize.reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {middlewares} from "../middlewares";
import {dialogReducer, IDialogState} from "./dialog.reducer";
import moment from "moment";
import {calendarSettingsReducer} from "./calendar-settings.reducer";
import {ICalendarSettings} from "../../settings/calendar.settings";
import {ITaskState, taskReducer} from "./task.reducer";
import {globalProcessingReducer, IGlobalProcessingState} from "./global-processing.reducer";
import {selectedDateReducer} from "./selected-date.reducer";

export interface IGlobalState {
    authorize: IAuthorizeState,
    dialog: IDialogState,
    globalProcessing: IGlobalProcessingState,
    selectedDate: moment.Moment,
    calendarSettings: ICalendarSettings,
    tasks: ITaskState
}



export const rootReducer = combineReducers<IGlobalState>({
    authorize: authorizeReducer,
    dialog: dialogReducer,
    globalProcessing: globalProcessingReducer,
    selectedDate: selectedDateReducer,
    calendarSettings: calendarSettingsReducer,
    tasks: taskReducer
});

export const configureStore = () => createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

