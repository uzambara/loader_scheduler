import React, {useEffect, useMemo} from "react";
import * as styles from "./std-calendar.scss";
import {StdCalendarHeader} from "./std-calendar-header";
import {StdCalendarSideScale} from "./std-calendar-side-scale";
import {StdCalendarColumn} from "./std-calendar-column";
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedDate} from "../../redux/selectors/global.selectors";
import {selectCalendarSettings} from "../../redux/selectors/calendar-settings.selectors";
import {getTasksByDate} from "../../redux/actions/task.actions";
import {selectGlobalProcessing} from "../../redux/selectors/processing.selectors";
import {selectTasksByDate} from "../../redux/selectors/task.selectors";
import {StdProcessing} from "../std-processing/std-processing";

export interface IStdCalendarProps {
    loaderId?: number
}

export function StdCalendar(props: IStdCalendarProps) {
    const dispatch = useDispatch();
    const selectedDate = useSelector(selectSelectedDate);
    const globalProcessingStatus = useSelector(selectGlobalProcessing);
    const tasks = useSelector(selectTasksByDate(selectedDate)) || [];
    const calendarSettings = useSelector(selectCalendarSettings);
    const {loaderId} = props;

    const columns = useMemo(() => {
        let loaders = loaderId
            ? calendarSettings.loaders.filter(l => l.id == loaderId)
            : calendarSettings.loaders;
        return [
            ...loaders,
            {id: null, name: "ФМ"}
        ]
    }, [calendarSettings.loaders, loaderId]);
    useEffect(() => {
        dispatch(getTasksByDate(selectedDate));
    }, [selectedDate]);
    return <div className={styles.calendarWrapper}>
        <StdCalendarHeader columns={columns}/>
        <StdCalendarSideScale start={1} stop={calendarSettings.hoursCount + 1} step={1} height={calendarSettings.rowHeight}/>
        <StdProcessing
            global={true}
            processingStatus={globalProcessingStatus.processingStatus}
            errorMessages={[globalProcessingStatus.errorMessage]}
        />
        {
            columns.map((column, idx) => {
                let loaderTasks = tasks.filter(t => t.loaderId == column.id);
                return <StdCalendarColumn
                    key={idx}
                    tasks={loaderTasks}
                    rowsCount={calendarSettings.hoursCount}
                    rowHeight={calendarSettings.rowHeight}
                    hideFact={false}
                    hidePlan={column.id === 0}
                />
            })
        }
    </div>
}
