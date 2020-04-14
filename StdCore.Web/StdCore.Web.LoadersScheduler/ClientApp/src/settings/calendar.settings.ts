import {ILoaderEntity} from "../data/loader";

export class ICalendarSettings {
    hoursCount: number;
    rowHeight: number;
    minuteHeight: number;
    loaders: ILoaderEntity[];
    startOfScaleTime: number
}
