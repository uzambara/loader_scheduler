import React, {useEffect, useMemo, useState} from "react";
import * as styles from "./std-calendar.scss";
import _ from "underscore";
import {dateTimeUtils} from "../../utils/date-time.utils";
import moment from "moment";
import {useSelector} from "react-redux";
import {selectCalendarSettings} from "../../redux/selectors/calendar-settings.selectors";
import {TaskUtil} from "../../utils/task-util";
import {Tooltip} from "@material-ui/core";

export interface IStdCalendarSideScaleProps {
    start: number,
    stop: number,
    step: number,
    height: number
}

export function StdCalendarSideScale(props: IStdCalendarSideScaleProps) {
    let {start, stop, step, height} = props;
    const [time, setTime] = useState(moment());

    const {minuteHeight, startOfScaleTime} = useSelector(selectCalendarSettings);
    const [top, setTop] = useState(dateTimeUtils.getPixelOffset(time, minuteHeight, startOfScaleTime) - 5);
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let newTop = dateTimeUtils.getPixelOffset(time, minuteHeight, startOfScaleTime) - 5;
        setTop(newTop);
    }, [time]);

    return <div className={styles.calendarSideScale}>
        <Tooltip title={time.format("HH:mm")} placement="top-start">
            <span className={styles.currentTimeMark} style={{top: top}}/>
        </Tooltip>

        {

            _.range(start, stop, step).map((el, idx) => <div
                key={idx}
                style={{
                    height: height
                }}
                className={styles.sideScaleItem}
            >
                <span className={styles.sideScaleItemText}>{el}</span>
            </div>)
        }
    </div>
}
