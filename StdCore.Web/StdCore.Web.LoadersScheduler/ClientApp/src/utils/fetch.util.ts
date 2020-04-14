import {IBaseRequest} from "../contracts/base-request";
import {IBaseResponse} from "../contracts/base-response";
import {LogUtil} from "./log.util";
import {ResponseStatus} from "../contracts/response-status";

export const getOptions: RequestInit = {
    method: "GET",
    headers: {'content-type': 'application/json'},
    credentials: 'include',
    mode: "cors"
};

export const postOptions: RequestInit = {
    method: "POST",
    headers: {'content-type': 'application/json'},
    credentials: 'include',
    mode: "cors"
};

export class RequestUtil {
    public static async get<TResponse extends IBaseResponse>(url: string, data?: IBaseRequest): Promise<TResponse> {
        let body = data ? JSON.stringify(data) : null;
        try {
            LogUtil.Log(`${url} start get:`, "");
            let response = await fetch(url, {
                ...getOptions,
                body: body
            });

            if(response.ok) {
                let json = (await response.json() as TResponse);

                LogUtil.Log(`${url} response:`, json);
                return json;
            }

            LogUtil.LogError(`${url}`, `Сервер ответил с ошибкой: ${response.statusText} url: ${url}`);
            return {
                status: ResponseStatus.Error,
                message: `Сервер ответил с ошибкой.`
            } as TResponse;
        } catch (error) {
            LogUtil.LogError(`Неизвестная ошибка: ${error}`);

            return {
                status: ResponseStatus.Error,
                message: `Неизвестная ошибка.`
            } as TResponse;
        }

    }

    public static async post<TResponse extends IBaseResponse>(url: string, data?: IBaseRequest): Promise<TResponse> {
        try {
            LogUtil.Log(`${url} start post:`, "");
            let body = data ? JSON.stringify(data) : null;
            let response = await fetch(url, {
                ...postOptions,
                body: body
            });

            if(response.ok) {
                let json = (await response.json() as TResponse);

                LogUtil.Log(`${url} response:`, json);
                return json;
            }

            LogUtil.LogError(`${url}`, `Сервер ответил с ошибкой: ${response.statusText} url: ${url}`);
            return {
                status: ResponseStatus.Error,
                message: `Сервер ответил с ошибкой.`
            } as TResponse;
        } catch (error) {
            LogUtil.LogError(`Неизвестная ошибка: ${error}`);

            return {
                status: ResponseStatus.Error,
                message: `Неизвестная ошибка.`
            } as TResponse;
        }
    }
}
