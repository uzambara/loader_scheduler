import React from "react";
import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";

export interface IStdTableColumn<T> {
    selector: keyof T,
    text: string,
}

export interface IStdTableProps<T> {
    tableHeader: string,
    columns: IStdTableColumn<T>[],
    data: T[],
    tableWrapperClassName?: any
}

export default function StdTable<T>(props: IStdTableProps<T>) {
    const columnText = props.columns.map(col => col.text);
    const data = props.data.map(d => props.columns.map(c => d[c.selector]));

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        selectableRows: "none",
        download: false,
        print: false,
        search: false,
        filter: false,
        pagination: false
    };
    return <div className={props.tableWrapperClassName}>
        <MUIDataTable
            title={props.tableHeader}
            data={data}
            columns={columnText}
            options={options}

        />
    </div>
}
