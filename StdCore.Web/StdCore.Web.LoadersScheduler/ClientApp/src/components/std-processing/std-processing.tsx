import * as React from "react";
import {CircularProgress} from "@material-ui/core";
import * as styles from "./std-processing.scss";
import {ProcessingStatus} from "../../enum/processing-type";
import {ProcessingNames} from "../../hooks/useProcessing";
import cn from "classnames";
import {Alert} from "@material-ui/lab";
import {StdErrorMessages} from "../std-error-messages/std-error-messages";

interface IStdProcessing {
    processingStatus: ProcessingStatus,
    errorMessages?: Array<string>,
    successMessage?: string,
    messageDurationMs?: number,
    global?: boolean
}

function SwitchProcessing(props: IStdProcessing) {
    const {processingStatus, successMessage, errorMessages} = props;
    switch (processingStatus) {
        case ProcessingStatus.Progress:
            return <CircularProgress />;
        case ProcessingStatus.Complete:
            return successMessage ? <p className={styles.success}>{successMessage}</p> : null;
        case ProcessingStatus.Error:
            return errorMessages && errorMessages.length > 0
                ? <Alert severity="error">
                        <StdErrorMessages messages={errorMessages}/>
                </Alert>
                : null;
        case ProcessingStatus.Timeout:
            return <p className={styles.error}>Вышло время ожидания ответа</p>;
        default:
            return null;
    }
}

export function StdProcessing(props: IStdProcessing) {
    const className = cn({
        [styles.processing]: true,
        [styles.global]: !!props.global
    });
    return <div className={className}>
        <SwitchProcessing {...props}/>
    </div>
}
