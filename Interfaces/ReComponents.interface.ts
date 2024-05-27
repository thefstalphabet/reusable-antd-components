import { FormInstance, MenuProps } from "antd";
import { SortOrder } from "antd/es/table/interface";
import { ReactNode } from "react";

type TextAreaOptionsTypes = {
    rowSize?: number;
    textAreaResize?: boolean;
};

export interface IInputField {
    label: string;
    name: string;
    type: "simple" | "email" | "password" | "textArea" | "number" | "url";
    required?: boolean;
    form?: any,
    min?: number;
    max?: number;
    maxLength?: number;
    textAreaWordLimit?: number;
    disable?: boolean;
    noStyle?: boolean;
    placeholder?: string;
    prefix?: React.ReactNode;
    textAreaOptions?: TextAreaOptionsTypes;
    width?: string;
    size?: "large" | "middle" | "small";
    onChange?: () => void;
    styles?: any
};

export interface ICheckbox {
    label: string;
    name: string;
    disable?: boolean;
    handleClick?: () => void;
};

export interface IReFormProps {
    layout?: "horizontal" | "vertical" | "inline";
    formInstance: FormInstance<any>;
    resetBtn?: boolean;
    submitBtn?: boolean;
    submitBtnText?: string;
    onSubmit: Function;
    onChange?: Function;
    children: any;
    initialFormValues?: any | {};
    formClassName?: any;
    fieldsClassName?: any;
    resetFieldsAfterSubmit?: boolean;
    disable?: boolean;
}

export interface IReDrawerProps {
    children: any;
    visibility: boolean;
    title?: string | React.ReactNode;
    footer?: boolean | React.ReactNode;
    onCancel?: Function;
    width?: number;
    placement?: "top" | "right" | "bottom" | "left";
    closable?: boolean;
    extraContent?: React.ReactNode
}

export interface IReMOdalProps {
    children: any;
    title?: string | React.ReactNode;
    visibility?: boolean;
    footer?: boolean | React.ReactNode;
    onOkay?: Function;
    onCancel: Function;
    width?: number;
    height?: number;
    closable?: boolean;
    onOkayBtnTitle?: string;
    centered?: boolean;
}

export interface IReNotificationConfig {
    header?: string
    description: string,
    duration?: number,
    placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
    type: "success" | "error" | "info" | "warning",
}

export interface ITabItem {
    title: string | ReactNode;
    key: string;
    children: any;
    disable?: boolean;
}
export interface IReTabProps {
    styles?: any;
    items: ITabItem[];
    onChange: Function;
    tabBarExtraContent?: ReactNode | { left?: ReactNode; right?: ReactNode };
    defaultOpenTab?: string;
    activeKey: string;
}

export interface ITagItem {
    title: string;
    key: string;
    color?: string;
}
export interface IReTagGroupProps {
    styles?: any;
    items: ITagItem[];
    setItems: Function;
    closeIcon?: ReactNode;
}

export interface IRadioItem {
    title: string;
    value: string | number | boolean;
    disable?: boolean;
}
export interface IReRadioGroupProps {
    label: string;
    name: string;
    disable?: boolean;
    items: IRadioItem[];
    noStyle?: boolean;
    defaultValue?: string | number | boolean
}

export interface ISelectItem {
    title: string;
    value: string | number | boolean;
}
export interface IReSelectProps {
    allowClear?: boolean;
    noStyle?: boolean;
    label: string;
    name: string;
    items: ISelectItem[];
    type?: "multiple" | "tags" | undefined;
    searchable?: boolean;
    required?: boolean;
    disable?: boolean;
    onChange?: Function;
    form?: any;
    placeholder?: string;
    autoFocus?: boolean;
    styles?: any;
}

export interface IReUploadProps {
    label: string;
    name: string;
    required?: boolean;
    BtnIcon?: any;
    BtnTitle: string;
    fileList: any[];
    fileListMaxCount: number;
    onBeforeUpload: Function;
    onRemove: Function;
    disable?: boolean;
    accept?: string;
    errorMessage: string;
    multiple?: any
}

export interface IReDropdownProps {
    className?: string,
    items: MenuProps['items']
    child: ReactNode
}

export interface IReTimepickerProps {
    label: string;
    name: string;
    required?: boolean;
    disable?: boolean;
    noStyle?: boolean
    placeholder: [string, string]
    allowClear?: boolean,
    className?: string
    format?: string
}