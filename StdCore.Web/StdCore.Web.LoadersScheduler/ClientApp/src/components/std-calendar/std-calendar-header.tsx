import React, {useLayoutEffect, useRef, useState} from "react";
import * as styles from "./std-calendar.scss";
import {NavLink} from "react-router-dom";
import {useComponentSize} from "../../hooks/useComponentSize";
import {Routes} from "../../routing/api-routes";

export interface IStdCalendarColumn {
    id: number,
    name: string
}

export interface IStdCalendarHeaderProps {
    columns: IStdCalendarColumn[]
}

export function StdCalendarHeader(props: IStdCalendarHeaderProps) {
    const containerRef = useRef<HTMLDivElement>();
    const [top, setTop] = useState("");
    const {size}= useComponentSize(containerRef);

    useLayoutEffect(() => {
        if(containerRef.current) {
            setTop((containerRef.current.getClientRects()[0].y) + "px");
        }
    }, [size]);

    return <div className={styles.calendarHeader} ref={containerRef} style={{
        position: "sticky",
        top: top
    }}>
        <div className={styles.calendarHeaderLogo}>
            <span className={styles.day}>ВС</span>
            <span className={styles.weekDay}>9</span>
        </div>
        {
            props.columns.map((column, idx) => {
                return <div key={idx} className={styles.calendarHeaderColumn}>
                    <NavLink to={`${Routes.calendar}/${column.id}`} className={styles.columnLink}>{column.name}</NavLink>
                </div>
            })
        }
    </div>
}
