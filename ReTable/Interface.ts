import { ReactNode } from "react";
import { SortOrder } from "antd/lib/table/interface";

export interface IProps {
  styles?: any;
  className?: string;
  columns: any;
  data?: any[];
  loading?: boolean;
  showHeader?: boolean;
  name?: string;
  headerTags?: IHeaderTags[];
  headerButtons?: IHeaderButtons[];
  headerDropdowns?: IHeaderDropdowns[];
  bordered?: boolean;
  pagination?: IPagination;
  rowSelection?: IRowSelection;
  scroll?: IScroll;
  columnOptions?: IColumnOptions;
  expandable?: IExpandable;
  showTableStats?: true;
  uniView?: IUniView;
  exportOption?: IExportOption;
  flag?: boolean;
  preventInitialLoad?: boolean;
}

export interface IHeaderTags {
  title: string;
  color: string;
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
  // sorting?: {
  //     colName: string;
  //     orderBy: "DESC" | "ASC";
  // };
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

export interface IHeaderDropdowns {
  hide?: boolean;
  styles?: any;
  showSearch?: boolean;
  allowClear?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  mode?: "multiple" | "tags";
  placeholder?: string;
  setSelectedValue: Function;
  value: string | number;
  options: {
    label: string;
    value: string | number;
  }[];
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

export interface IExpandable {
  rowExpandable?: (record: any) => boolean;
  expandedRowRender: (record: any, index: number) => ReactNode;
  expandIcon?: (props: any) => ReactNode;
  expandRowByClick?: boolean; // Whether to expand row by clicking anywhere in the whole row
}

// expand
interface ICheckboxProp {
  disabled: boolean;
}
export interface IRowSelection {
  selectedRowKeys: string[] | number[];
  type: "checkbox" | "radio";
  setSelectedRowKeys: Function;
  rowKey?: string; // define when using the row selection and you want to change your selection key from id to somthing
  getCheckboxProps?: (row: any) => ICheckboxProp;
  selectRowtype?: "id" | "allData";
  selectedRowValues?: any[];
  setSelectedRowValues?: Function;
}

// filter options
interface IFilterItem {
  text: string;
  value: number | string | boolean;
}
interface IKeysWFilterItems {
  key: string;
  items: IFilterItem[];
}
interface IKeysWAction {
  key: string;
  action?: (value: number | string) => number | string;
}
export interface IColumnOptions {
  sorting?: {
    columns: string[];
    sortingDirections?: SortOrder[];
  };
  filter?: {
    columns: Array<string | IKeysWFilterItems | IKeysWAction>;
    filterSearch?: boolean;
  };
}
