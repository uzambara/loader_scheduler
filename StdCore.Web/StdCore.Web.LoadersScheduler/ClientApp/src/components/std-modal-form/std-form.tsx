import React, {PropsWithChildren, useState} from "react";
import * as styles from "./std-form.scss";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    TextField
} from '@material-ui/core';
import Draggable from "react-draggable";

export interface IStdForm {
    onSubmit?: () => void,
    className?: any
}

export function StdForm(props: PropsWithChildren<IStdForm>) {
    return <form
        className={props.className}
        onSubmit={(ev) => {
            ev.preventDefault();
            props.onSubmit && props.onSubmit();
        }
    }>
        {props.children}
    </form>
}

export function StdForm2(props: PropsWithChildren<IStdForm>) {
    const [open, setOpen] = useState(true);
    return <Draggable>
        <Dialog
        open={open}
        hideBackdrop={true}
        onClose={(v) => setOpen(false)}

    >
        <DialogTitle>
            Title
        </DialogTitle>
        <DialogContent>
            <TextField label="text input"/>
            <TextField label="text input"/>
            <TextField label="text input"/>
        </DialogContent>
        <DialogActions>
            <Button>OK</Button>
            <Button>Cancel</Button>
        </DialogActions>
    </Dialog>
    </Draggable>
}
