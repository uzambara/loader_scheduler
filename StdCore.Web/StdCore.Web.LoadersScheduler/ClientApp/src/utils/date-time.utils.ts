import moment from "moment";
import {LogUtil} from "./log.util";

const millisecondsOffset = moment().utcOffset() * 60 * 1000;
console.log("millisecondsOffset", millisecondsOffset);

function mergeTime(date: moment.Moment, time: moment.Moment): moment.Moment {
    if(time == null)
        return date;
    return date.clone().set({
        hour: time.get("hour"),
        minute: time.get("minute"),
        seconds: time.get("second")
    });
}

function unixToDateTime(utc: number): moment.Moment {
    let result = moment(utc - millisecondsOffset);
    return result;
}

function dateTimeToUnix(date: moment.Moment): number {
    return (date.valueOf() + millisecondsOffset);
}

function getPixelOffset(time: moment.Moment, minuteHeightPixels: number, startOfScaleTimeInHours: number) {
    let midnight = time.clone().startOf('day');

    let result = Math.round(startOfScaleTimeInHours * 60 * minuteHeightPixels + time.diff(midnight, "minute") * minuteHeightPixels);
    return result;
}

export const dateTimeUtils = {
    mergeTime,
    unixToDateTime,
    dateTimeToUnix,
    getPixelOffset
};
