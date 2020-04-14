
import * as styles from './std-time-input.scss';
import React from "react";
import moment from "moment";
import cn from "classnames";
import {TextField} from "@material-ui/core";

export interface IStdTimePicker {
    value: moment.Moment,
    onChange: (newVal: moment.Moment) => void,
    classname?: any,
    label?: string
}

export function StdTimePicker(props: IStdTimePicker) {
    return <div className={cn(styles.inputWrapper, props.classname)}>
        <TextField
            label={props.label}
            variant={"outlined"}
            size={"small"}
            type="time"
            defaultValue={props.value.format("HH:mm")}
            onBlur={(ev) => {
                props.onChange(moment(ev.target.value, "HH:mm"));
            }}
            className={styles.uiInput}
        />
    </div>
}

// import React, {useState} from "react";
// import {KeyboardTimePicker} from "@material-ui/pickers";
// import moment from "moment";
// import * as styles from "../std-date-input/std-date-input.scss";
//
// export interface IStdTimePicker {
//     label?: string,
//     value: moment.Moment,
//     onChange: (value: moment.Moment) => void
// }
//
// export function StdTimePicker(props: IStdTimePicker) {
//     const[currentValue, setCurrentValue] = useState(props.value);
//     const[date] = useState(props.value.format("DD.MM.YYYY "));
//
//     return <KeyboardTimePicker
//         ampm={false}
//         disableToolbar={true}
//         open={false}
//         className={styles.input}
//         onChange={newValue => {
//             let val = moment(date + newValue["_i"], "DD.MM.YYYY HH:mm");
//             if(val.isValid()) {
//                 setCurrentValue(prev => {
//                     prev.set({
//                         minute: val.get("minute"),
//                         hour: val.get("hour")
//                     });
//                     return prev;
//                 })
//             } else {
//                 setCurrentValue(newValue);
//             }
//
//         }}
//         onBlur={ev => {
//             if(currentValue.isValid()) {
//                 props.onChange(currentValue);
//                 return;
//             } else {
//                 let val = moment(date + currentValue["_i"], "DD.MM.YYYY HH:mm");
//                 if(val.isValid()) {
//                     setCurrentValue(val);
//                     props.onChange(val);
//                     return;
//                 } else {
//                     setCurrentValue(props.value);
//                 }
//             }
//         }}
//         value={currentValue}
//         inputVariant="outlined"
//         label={props.label}
//         size="small"
//         format="HH:mm"
//     />
// }
