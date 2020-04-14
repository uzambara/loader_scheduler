import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import React from "react";

export interface IStdDialogProps {
    isOpen: boolean,
    close: () => void,
    onOk: () => void,
    message: string,
    needOKButton?: boolean
    needCancelButton?: boolean,
    okButtonText?: string,
    cancelButtonText?: string,
}

export function StdDialog(props: IStdDialogProps) {
    const {
        close,
        isOpen,
        onOk,
        cancelButtonText = "Отмена",
        okButtonText = "OK",
        needCancelButton = true,
        needOKButton = true,
        message
    } = props;


    return <Dialog
        open={isOpen}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title"/>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {
                needOKButton &&
                <Button onClick={async () => {
                    close();
                    onOk();
                }} color="primary">
                    {okButtonText}
                </Button>
            }
            {
                needCancelButton &&
                <Button onClick={close} color="primary" autoFocus>
                    {cancelButtonText}
                </Button>
            }
        </DialogActions>
    </Dialog>
}
