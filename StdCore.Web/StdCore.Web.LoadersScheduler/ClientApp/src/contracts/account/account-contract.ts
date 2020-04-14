import {IBaseRequest} from "../base-request";
import {IBaseResponse} from "../base-response";
import {IUserEntity} from "../../data/user";

export interface IAccountLoginRequest extends IBaseRequest {
    login: string,
    password: string,
    returnUrl?: string
}

export interface IAccountLoginResponse extends IBaseResponse {
    user: IUserEntity
}

export interface IAccountLogoutRequest extends IBaseRequest {
}

export interface IAccountLogoutResponse extends IBaseResponse {
}

export interface IGetCurrentUserRequest extends IBaseRequest {
}

export interface IGetCurrentUserResponse extends IBaseResponse {
    user: IUserEntity
}

export interface IAccountRegisterRequest extends IBaseRequest, IUserEntity {
    password: string
}

export interface IAccountRegisterResponse extends IBaseResponse {
}
