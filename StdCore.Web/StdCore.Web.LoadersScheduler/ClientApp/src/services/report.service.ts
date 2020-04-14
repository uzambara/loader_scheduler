import {IGetTasksByDateReportRequest, IGetTasksByDateReportResponse} from "../contracts/reports/reporsts-contract";
import {RequestUtil} from "../utils/fetch.util";
import {ApiRoutes} from "../routing/api-routes";

export class ReportService {
    public static async GetTasksByDateReport(request: IGetTasksByDateReportRequest): Promise<IGetTasksByDateReportResponse> {
        return await RequestUtil.post<IGetTasksByDateReportResponse>(ApiRoutes.Report.getTasksByDateReport, request);
    }
}
