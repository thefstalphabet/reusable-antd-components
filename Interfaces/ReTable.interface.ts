import { SortOrder } from "antd/es/table/interface";
import { ReactNode } from "react";

export interface IReTableProps {
    className?: string;
    columns: any;
    data?: any[];
    loading?: boolean;
    name?: string;
    header?: IHeader
    pagination?: IPagination;
    scroll?: IScroll;
    columnOptions?: IColumnOptions;
    exportOption?: IExportOption;
    refreshTable?: boolean;
}
interface IHeader {
    headerButtons?: IHeaderButtons[];
    title?: string | ReactNode;
}

export interface IHeaderButtons {
    title: string;
    icon?: ReactNode;
    onClick?: any;
    type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
    disabled?: boolean;
    href?: string;
    loading?: boolean;
    size?: "large" | "middle" | "small";
    htmlType?: "submit";
    visibility?: boolean;
}
export interface IPagination {
    disabled?: boolean;
    pageSizeOptions?: string[] | number[];
    total?: number;
    current?: number;
}


export interface IScroll {
    x?: number | true;
    y?: number | "max-content";
}

interface IFilterItem {
    text: string;
    value: number | string | boolean;
}interface IKeysWFilterItems {
    key: string;
    items: IFilterItem[];
}
interface IKeysWAction {
    key: string;
    action?: (value: number | string) => number | string;
}
export interface IColumnOptions {
    sorting?: {
        columnsKeys: string[];
        sortingDirections?: SortOrder[];
    };
    filter?: {
        columnsKeys: Array<string | IKeysWFilterItems | IKeysWAction>;
        filterSearch?: boolean;
    };
}

interface IExportOption {
    csv?: {
        fileName?: string;
        columns?: string[];
        disabled?: boolean;
        params?: IUniView;
        endPoint?: string;
        selectRowtype?: "id" | "allData";
    };
    pdf?: {
        disabled?: boolean;
        loading?: boolean;
        onClick: () => void;
    };
}
export interface IUniView {
    uniView: string;
    viewName: string;
    apiUrl: string;
    endPoint?: string;
    returnResponse?: (res: any) => any;
    option?: {
        limit?: number;
        orderBy?: {
            key: string;
            order: "DESC" | "ASC";
        };
        selectFields?: string[]
    };
    filter?: any;
    extra?: any;
}
