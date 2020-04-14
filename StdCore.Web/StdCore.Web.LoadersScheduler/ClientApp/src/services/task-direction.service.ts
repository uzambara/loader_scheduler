import {RequestUtil} from "../utils/fetch.util";
import {IGetAllTaskDirectionsResponse} from "../contracts/direction/direction-contract";
import {ApiRoutes} from "../routing/api-routes";

export class TaskDirectionService {
    public static async GetAllTaskDirections(): Promise<IGetAllTaskDirectionsResponse> {
        return await RequestUtil.get<IGetAllTaskDirectionsResponse>(ApiRoutes.Direction.getAllDirections);
    }
}
