import {IBaseResponse} from "../../contracts/base-response";
import {ResponseStatus} from "../../contracts/response-status";
import {setGlobalProcessing} from "./global-processing.action";
import {ProcessingStatus} from "../../enum/processing-type";
import {ThunkDispatch} from "redux-thunk";
import {IGlobalState} from "../reducers";
import {LogUtil} from "../../utils/log.util";

export function dispatchResponse(
        response: IBaseResponse,
        action: any,
        dispatch: ThunkDispatch<IGlobalState, any, any>,
        errorMessage: string = "При загрузке данных прооизошла ошибка."
) {
    if(response.status === ResponseStatus.Success) {
        dispatch(setGlobalProcessing({
            processingStatus: ProcessingStatus.None
        }));
        action && dispatch(action);
    } else {
        LogUtil.LogError(errorMessage, response.message);

        dispatch(setGlobalProcessing({
            loadingMessage: errorMessage,
            processingStatus: ProcessingStatus.Error
        }));
    }
}
