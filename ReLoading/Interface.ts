export interface ISpin {
    delay?: number;
    size: "small" | "default" | "large";
    spinning?: boolean;
    indicator?: any;
}
export interface ISkeleton {
    loading?: boolean;
    active?: boolean;
    rows?: number;
    width?: number | string | Array<number | string>;
}

export interface IProps {
    type: "spin" | "skeleton";
    prop: ISpin | ISkeleton;
}