import {ResponseStatus} from "./response-status";

export interface IBaseResponse {
    status: ResponseStatus,
    message: string
}
