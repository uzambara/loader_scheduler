import React from "react";
import {Button} from "@material-ui/core";
import * as styles from "./std-start-stop-buttons.scss";

export interface IStdStartStopButtonsProps {
    legendText: string,
    onStart: () => void,
    onStop: () => void
}

export function StdStartStopButtons(props: IStdStartStopButtonsProps) {
    return <div className={styles.wrapper}>
        <fieldset className={styles.fieldset}>
            <legend>{props.legendText}</legend>
            <div className={styles.buttonsWrapper}>
                <Button style={{backgroundColor: "rgba(34,139,34,0.7)"}} onClick={props.onStart}>старт</Button>
                <Button style={{backgroundColor: "rgba(255,73,59,0.7)"}} onClick={props.onStop}>стоп</Button>
            </div>
        </fieldset>
    </div>
}
