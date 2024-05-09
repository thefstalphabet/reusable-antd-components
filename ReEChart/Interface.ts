
export interface ITitle {
    text?: string;
    subtext?: string;
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
}
export interface ILegend {
    orient: "horizontal" | "vertical";
    align: "auto" | "left" | "right";
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
}
export interface IPieData {
    name: string,
    value: string | number
}
export interface IBarData {
    labels: string[],
    data: {
        name: string,
        value: Array<string | number>
    }[]
}

export interface IConfig {
    type: "pie" | "doughnut" | "VBar" | "HBar" | "HStackBar" | "VStackBar" | "stackLine";
    title?: ITitle;
    legend?: ILegend;
    toolTip?: boolean;
    name?: string;
    data?: IPieData[] | IBarData;
    xAxis?: IXAxis;
    yAxis?: IYAxis;
}

export interface IXAxis {
    rotate?: number;
}

export interface IYAxis {
    rotate?: number;
}

export interface IEvents {
    click?: (params: any) => void;
}

export interface IProps {
    styles?: any;
    className?: string;
    config: IConfig;
    loading: boolean;
    events?: IEvents;
    color?: string[]
} 