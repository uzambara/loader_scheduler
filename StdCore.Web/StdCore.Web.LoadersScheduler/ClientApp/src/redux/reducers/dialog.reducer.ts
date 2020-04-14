import {DialogType} from "../../enum/DialogType";
import {DialogAction, DialogActionType} from "../actions/dialog.actions";

export interface IDialogState {
    currentOpenedDialogType: DialogType,
    currentOpenedDialogData: any
}

const initialState: IDialogState = {
    currentOpenedDialogType: null,
    currentOpenedDialogData: null
};

export function dialogReducer(state: IDialogState = initialState, action: DialogAction) {
    switch (action.type) {
        case DialogActionType.SetDialog:
            return {
                currentOpenedDialogType: action.payload.dialogType,
                currentOpenedDialogData: action.payload.dialogData
            };
        default:
            return state;
    }
}
