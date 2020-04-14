import {ProcessingStatus} from "../../enum/processing-type";
import {GlobalProcessingAction, GlobalProcessingActionType} from "../actions/global-processing.action";

export interface IGlobalProcessingState {
    processingStatus: ProcessingStatus,
    errorMessage?: string,
    dialogMessage?: string,
    loadingMessage?: string
}

const initialState: IGlobalProcessingState = {
    processingStatus: ProcessingStatus.None,
    errorMessage: "",
    loadingMessage: "",
    dialogMessage: ""
};

export const globalProcessingReducer = (state: IGlobalProcessingState = initialState, action: GlobalProcessingAction): IGlobalProcessingState => {
    switch(action.type) {
        case(GlobalProcessingActionType.SetProcessing):
            return {
                ...action.payload
            };
        default:
            return state;
    }
};
