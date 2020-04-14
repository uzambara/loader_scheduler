import {useDispatch, useSelector} from "react-redux";
import {DialogType} from "../enum/DialogType";
import {SetDialog} from "../redux/actions/dialog.actions";
import {selectCurrentOpenDialog} from "../redux/selectors/dialog.selectors";

export function useFormDialog(dialogType: DialogType) {
    const {currentOpenedDialogData, currentOpenedDialogType} = useSelector(selectCurrentOpenDialog);
    const dispatch = useDispatch();

    const isOpen = (currentOpenedDialogType == dialogType);

    return {
        dialogData: currentOpenedDialogData,
        isOpen: isOpen,
        setIsOpen: (dialogData) => {
            dispatch(SetDialog(dialogType, dialogData));
        },
        open: (dialogData) => {
            dispatch(SetDialog(dialogType, dialogData));
        },
        close: () => {
            dispatch(SetDialog(null, null));
        }
    }
}
