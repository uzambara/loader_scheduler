import {DialogType} from "../../enum/DialogType";

export type DialogAction =
    ISetDialog;

export enum DialogActionType {
    SetDialog = "SET_DIALOG"
}

export interface ISetDialog {
    type: DialogActionType.SetDialog,
    payload: {
        dialogType: DialogType,
        dialogData: any
    }
}

export const SetDialog = (dialogType: DialogType, dialogData: any): ISetDialog => ({
    type: DialogActionType.SetDialog,
    payload: {
        dialogType,
        dialogData
    }
});
