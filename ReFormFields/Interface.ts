export type TextAreaOptionsTypes = {
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