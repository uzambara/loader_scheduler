import {IGlobalState} from "../reducers";

export const selectIsAuthorized = (state: IGlobalState) => state.authorize.authorized;
export const selectCurrentUser = (state: IGlobalState) => state.authorize.user;
