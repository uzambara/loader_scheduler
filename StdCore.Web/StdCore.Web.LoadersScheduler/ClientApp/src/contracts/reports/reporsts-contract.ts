import {IBaseRequest} from "../base-request";
import {IBaseResponse} from "../base-response";
import {ITaskByDateReportRow} from "../../models/tasks-by-date-report-row.model";

export interface IGetTasksByDateReportRequest extends IBaseRequest {
    startTimeUtc: number,
    endTimeUtc: number
}

export interface IGetTasksByDateReportResponse extends IBaseResponse {
    groupedByUserReportRows: {
        [userName: string]: Array<ITaskByDateReportRow>
    }
}
