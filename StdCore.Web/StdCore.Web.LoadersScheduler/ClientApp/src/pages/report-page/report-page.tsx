import * as styles from "./report-page.scss";
import {StdHeader} from "../../components/std-header/std-header";
import React, {useEffect, useState} from "react";
import {StdDatePicker} from "../../components/std-inputs/std-date-input/std-date-input";
import moment from "moment";
import {StdTimePicker} from "../../components/std-inputs/std-time-input/std-time-input";
import {Button} from "@material-ui/core";
import StdTable, {IStdTableColumn} from "../../components/std-table/std-table";
import {ReportRequestFactory} from "../../factories/report-request-factory";
import {ReportService} from "../../services/report.service";
import {LogUtil} from "../../utils/log.util";
import {ITaskByDateReportRow} from "../../models/tasks-by-date-report-row.model";
import {dateTimeUtils} from "../../utils/date-time.utils";


export function ReportPage(props) {
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());

    const [startTime, setStartTIme] = useState(moment());
    const [endTime, setEndTime] = useState(moment());

    const [noDataMessage, setNoDataMessage] = useState(false);

    const [reportData, setReportData] = useState<Map<string, Array<ITaskByDateReportRow>>>();
    const getData = async () => {
        const start = dateTimeUtils.mergeTime(startDate, startTime);
        const end = dateTimeUtils.mergeTime(endDate, endTime);
        const request = ReportRequestFactory.GetGetTasksByDateReportRequest(start, end);

        setNoDataMessage(false);
        const response = await ReportService.GetTasksByDateReport(request);
        let map = new Map<string, Array<ITaskByDateReportRow>>(Object.entries(response.groupedByUserReportRows));
        if(map.size > 0)
            setReportData(map);
        else
            setNoDataMessage(true);

    };

    return <div className={styles.reportPage}>
        <StdHeader>
            <div className={styles.pickersWrapper}>
                <div className={styles.dateAndTimeWrapper}>
                    <StdDatePicker value={startDate} onChange={setStartDate} label="Начало"/>
                    <StdTimePicker value={startTime} onChange={setStartTIme} label="Начало"/>
                </div>
                <div className={styles.dateAndTimeWrapper}>
                    <StdDatePicker value={endDate} onChange={setEndDate} label="Конец"/>
                    <StdTimePicker value={endTime} onChange={setEndTime} label="Конец"/>
                </div>
                <Button
                    className={styles.getReportButton}
                    variant={"contained"}
                    color={"primary"}
                    onClick={getData}
                >
                    Сформировать
                </Button>
            </div>
        </StdHeader>
        <div className={styles.content}>
            {noDataMessage && <p className={styles.noData}>Данные не найдены</p>}
            {renderTables(reportData)}
        </div>

    </div>
}

const testData = () => {
    const result = new Map<string, Array<ITaskByDateReportRow>>();

    result.set("some name 1", [
        {
            date: "01.05.2019", direction: "направление 1", endTime: "11:00", comment: "причина", startTime: "09:00", duration: "2 часа"
        },
        {
            date: "01.05.2019", direction: "направление 2", endTime: "13:00", comment: "причина", startTime: "12:00", duration: "2 часа"
        },
        {
            date: "01.05.2019", direction: "направление 3", endTime: "15:00", comment: "причина", startTime: "14:00", duration: "3 часа"
        }
    ]);
    result.set("some name 2", [
        {
            date: "01.05.2019", direction: "направление 1", endTime: "11:00", comment: "причина", startTime: "09:00", duration: "2 часа"
        },
        {
            date: "01.05.2019", direction: "направление 2", endTime: "13:00", comment: "причина", startTime: "12:00", duration: "2 часа"
        },
        {
            date: "01.05.2019", direction: "направление 3", endTime: "15:00", comment: "причина", startTime: "14:00", duration: "3 часа"
        }
    ]);

    return result;
};

const renderTables = (data: Map<string, Array<ITaskByDateReportRow>>) => {
    const result = [];
    if(!data)
        return null;

    data.forEach((gr, key) => result.push(<StdTable<ITaskByDateReportRow>
        key={key}
        tableWrapperClassName={styles.table}
        data={gr}
        tableHeader={key}
        columns={tasksByDateReportColumns}
    />));

    return result;
};

const tasksByDateReportColumns: IStdTableColumn<ITaskByDateReportRow>[] = [
    {
        text: "Дата",
        selector: "date"
    },
    {
        text: "Направоение",
        selector: "direction"
    },
    {
        text: "Причина",
        selector: "comment"
    },
    {
        text: "Время начала",
        selector: "startTime"
    },
    {
        text: "Время окончания",
        selector: "endTime"
    },
    {
        text: "Время работы",
        selector: "duration"
    },
];
