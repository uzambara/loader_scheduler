import {IGlobalState} from "../reducers";
import moment from "moment";
import {LogUtil} from "../../utils/log.util";

export const selectTasksByDate = (date: moment.Moment) => (state: IGlobalState) =>
    state.tasks.tasksMap.get(date.format("DD.MM.YYYY"));
