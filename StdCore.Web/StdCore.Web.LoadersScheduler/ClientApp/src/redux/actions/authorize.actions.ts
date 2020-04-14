import {Dispatch} from "redux";
import {AuthorizeService} from "../../services/authorize.service";
import {dispatchResponse} from "./index";
import {IUserEntity} from "../../data/user";

export const Login = (login: string, password: string) => async (dispatch: Dispatch) => {
    const loginResult = await AuthorizeService.Login(login, password);
    dispatchResponse(loginResult, SetUser(loginResult.user), dispatch);
};

export type AuthorizeAction =
    ISetUser;

export enum AuthorizeActionType {
    SetUser = "SET_USER"
}

export interface ISetUser {
    payload: IUserEntity,
    type: AuthorizeActionType.SetUser
}

export const SetUser = (user: IUserEntity) => ({
    payload: user,
    type: AuthorizeActionType.SetUser
});
