import React from "react";
import * as styles from "./std-calendar.scss";
import {TaskModel} from "../../models/task.model";
import {StdCalendarTask} from "../std-calendar-task/std-calendar-task";
import _ from "underscore";

export interface IStdCalendarColumnProps {
    tasks: Array<TaskModel>,
    rowHeight: number,
    rowsCount: number,
    hidePlan: boolean,
    hideFact: boolean,
}

export function StdCalendarColumn(props: IStdCalendarColumnProps) {
    let {tasks, rowHeight, rowsCount} = props;
    return <div className={styles.calendarColumn}>
        {
            !props.hidePlan &&
            <div className={styles.calendarSubColumn}>
                <span className={styles.subColumnHeader}>План</span>
                {
                    tasks.map((task, idx) => {
                        return <StdCalendarTask key={idx} task={task} isFact={false}/>
                    })
                }
                {
                    _.range(rowsCount).map(row => {
                        return <div key={row} className={styles.calendarRow} style={{height: rowHeight}}/>
                    })
                }
            </div>
        }
        {
            !props.hideFact &&
            <div className={styles.calendarSubColumn}>
                <span className={styles.subColumnHeader}>Факт</span>
                {
                    tasks.map((task, idx) => {
                        return task.factStart ? <StdCalendarTask key={idx} task={task} isFact={true}/> : null
                    })
                }
                {
                    _.range(rowsCount).map(row => {
                        return <div key={row} className={styles.calendarRow} style={{height: rowHeight}}/>
                    })
                }
            </div>
        }
    </div>
}
