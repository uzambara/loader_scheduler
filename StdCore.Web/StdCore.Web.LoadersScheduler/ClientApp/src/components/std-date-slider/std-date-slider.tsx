import * as styles from "./std-date-slider.scss";
import {Button} from "@material-ui/core";
import * as icons from "@root/icons.scss";
import {StdDatePicker} from "../std-inputs/std-date-input/std-date-input";
import React from "react";
import moment from "moment";

export interface IStdDateSliderProps {
    selectedDate: moment.Moment
    setDate: (date: moment.Moment) => void,
    nextDate: () => void,
    prevDay: () => void,
    setToday: () => void
}

export function StdDateSlider(props: IStdDateSliderProps) {
    const {nextDate, prevDay, setDate, setToday, selectedDate} = props;

    return <div className={styles.dateSlider}>
        <Button
            variant="outlined"
            color="default"
            draggable={"true"}
            size="small"
            onClick={setToday}
            className={styles.todayButton}
        >
            Сегодня
        </Button>
        <Button
            color="default"
            size="small"
            variant="outlined"
            onClick={prevDay}
            className={styles.sliderButton}
        >
            <span className={icons.backArrow}/>
        </Button>
        <Button
            color="default"
            size="small"
            variant="outlined"
            onClick={nextDate}
            className={styles.sliderButton}
        >
            <span className={icons.forwardArrow}/>
        </Button>
        <StdDatePicker
            value={selectedDate}
            onChange={setDate}
            label="Дата"
        />
    </div>
}
