import {IGlobalState} from "../reducers";

export const selectCurrentOpenDialog = (state: IGlobalState) => state.dialog;
