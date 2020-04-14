import {AuthorizeAction, AuthorizeActionType} from "../actions/authorize.actions";
import {IUserEntity} from "../../data/user";

export interface IAuthorizeState {
    user: IUserEntity,
    authorized: boolean
}

const initialState: IAuthorizeState = {
    authorized: false,
    user: null
};

export const authorizeReducer = (state: IAuthorizeState = initialState, action: AuthorizeAction): IAuthorizeState => {
    switch (action.type) {
        case AuthorizeActionType.SetUser:
            return {
                authorized: action.payload != null,
                user: action.payload
            };
        default:
            return state;
    }
};
