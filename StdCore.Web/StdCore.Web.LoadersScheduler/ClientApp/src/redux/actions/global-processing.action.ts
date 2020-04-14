import {IGlobalProcessingState} from "../reducers/global-processing.reducer";

export type GlobalProcessingAction =
    ISetGlobalProcessing;

export enum GlobalProcessingActionType {
    SetProcessing = "SET_PROCESSING"
}

export interface ISetGlobalProcessing {
    type: GlobalProcessingActionType,
    payload: IGlobalProcessingState
}

export const setGlobalProcessing = (processingStatus: IGlobalProcessingState): ISetGlobalProcessing => ({
    type: GlobalProcessingActionType.SetProcessing,
    payload: processingStatus
});
