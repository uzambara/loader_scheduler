import {IBaseResponse} from "../base-response";
import {IBaseRequest} from "../base-request";
import {ITaskDirectionEntity} from "../../data/direction";

export interface IGetAllTaskDirectionsRequest extends IBaseRequest {

}

export interface IGetAllTaskDirectionsResponse extends IBaseResponse{
    directions: ITaskDirectionEntity[]
}
