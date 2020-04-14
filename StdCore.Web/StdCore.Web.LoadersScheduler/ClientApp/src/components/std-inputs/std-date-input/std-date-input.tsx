import React, {useState} from "react";
import {KeyboardDatePicker} from "@material-ui/pickers";
import moment from "moment";
import * as styles from "./std-date-input.scss";

export interface IStdDatePicker {
    label?: string,
    value: moment.Moment,
    onChange: (value: moment.Moment) => void
}

export function StdDatePicker(props: IStdDatePicker) {
    return <KeyboardDatePicker
        autoOk={true}
        className={styles.input}
        onChange={props.onChange}
        value={props.value}
        inputVariant="outlined"
        label={props.label}
        size="small"
        format="DD.MM.YYYY"
    />
}
