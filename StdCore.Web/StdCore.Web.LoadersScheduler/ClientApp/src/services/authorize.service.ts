import {
    IAccountLoginRequest,
    IAccountLoginResponse,
    IAccountLogoutResponse,
    IAccountRegisterRequest,
    IAccountRegisterResponse, IGetCurrentUserResponse
} from "../contracts/account/account-contract";
import {RequestUtil} from "../utils/fetch.util";
import {ApiRoutes} from "../routing/api-routes";

export class AuthorizeService {
    public static async Login(login: string, password: string): Promise<IAccountLoginResponse> {
        let request: IAccountLoginRequest = {
            login,
            password
        };

        return await RequestUtil.post<IAccountLoginResponse>(ApiRoutes.Account.login, request);
    }

    public static async Logout(): Promise<IAccountLogoutResponse> {
        return  await RequestUtil.post<IAccountLoginResponse>(ApiRoutes.Account.logout);
    }

    public static async Register(login: string, password: string, name: string, lastName: string): Promise<IAccountRegisterResponse> {
        let request: IAccountRegisterRequest = {
            login,
            password,
            name,
            lastName
        };
        return  await RequestUtil.post<IAccountLoginResponse>(ApiRoutes.Account.register, request);
    }

    public static async GetCurrentUser(): Promise<IGetCurrentUserResponse> {
        return  await RequestUtil.get<IGetCurrentUserResponse>(ApiRoutes.Account.getCurrentUser);
    }
}
