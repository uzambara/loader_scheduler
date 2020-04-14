import moment from "moment";
import {IGetTasksByDateReportRequest} from "../contracts/reports/reporsts-contract";
import {dateTimeUtils} from "../utils/date-time.utils";

export class ReportRequestFactory {
    public static GetGetTasksByDateReportRequest(start: moment.Moment, end: moment.Moment): IGetTasksByDateReportRequest {
        return {
            startTimeUtc: dateTimeUtils.dateTimeToUnix(start),
            endTimeUtc: dateTimeUtils.dateTimeToUnix(end),
        }
    }
}
