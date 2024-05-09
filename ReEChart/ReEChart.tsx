import { Skeleton } from "antd";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { IConfig, IProps } from "./Interface";

const defaultStyling = {
  backgroundColor: "#ffffff",
  padding: "1rem",
};

const defaultColor: string[] = ["#9bca63", "#e01f54", "#fcce10", ""];

function ReEChart(props: IProps) {
  const { styles, className, config, loading, events, color } = props;
  const [options, setOptions] = useState({});

  const renderRound = (type: string, config: IConfig, data: any) => {
    const { title, legend, toolTip, name } = config;

    let radius;
    if (type === "pie") {
      radius = "50%";
    } else if (type === "doughnut") {
      radius = ["40%", "70%"];
    }

    const series = {
      name: name,
      type: "pie",
      radius: radius,
      data: data,
    };

    return {
      title: title,
      legend: legend,
      tooltip: toolTip
        ? {
            trigger: "item",
          }
        : null,
      series: series,
    };
  };

  const renderBar = (type: string, config: IConfig, data: any) => {
    const { title, legend, toolTip } = config;
    const { labels } = data;

    // by default the axis values is for vertical bar
    let xAxis: any = {
      type: "category",
      data: labels,
      axisLabel: {
        interval: 0,
        rotate: config?.xAxis?.rotate || 0,
      },
    };
    let yAxis: any = {
      type: "value",
      axisLabel: {
        interval: 0,
        rotate: config?.yAxis?.rotate || 0,
      },
    };

    // changing axis for horizontal bar
    if (type === "HBar" || type === "HStackBar") {
      delete xAxis.data;
      xAxis.type = "value";
      yAxis.type = "category";
      yAxis["data"] = labels;
    }

    // creating series data for stacka nd normal bar
    let series = data.data.map((ele: any) => {
      let obj: any = {};
      const { name, value } = ele;

      if (type === "HStackBar" || type === "VStackBar") {
        obj["stack"] = "total";
      }

      return {
        ...obj,
        name: name,
        type: "bar",
        data: value,
      };
    });

    const options = {
      title: title,
      legend: legend,
      tooltip: toolTip
        ? {
            trigger: "axis",
          }
        : null,
      xAxis: xAxis,
      yAxis: yAxis,
      series: series,
    };
    return options;
  };

  const renderLine = (type: string, config: IConfig, data: any) => {
    const { title, legend, toolTip } = config;
    const { labels } = data;

    // by default the axis values is for vertical bar
    let xAxis: any = {
      type: "category",
      data: labels,
    };
    let yAxis: any = {
      type: "value",
    };

    // creating series data for stacka nd normal bar
    let series = data.data.map((ele: any) => {
      let obj: any = {
        emphasis: {
          focus: "series",
        },
      };
      const { name, value } = ele;

      if (type === "stackLine") {
        obj["stack"] = "total";
      }

      return {
        ...obj,
        name: name,
        type: "line",
        data: value,
        areaStyle: {},
      };
    });

    const options = {
      title: title,
      legend: legend,
      tooltip: toolTip
        ? {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          }
        : null,
      xAxis: xAxis,
      yAxis: yAxis,
      series: series,
    };
    return options;
  };

  const buildOptions = (config: IConfig) => {
    const { type, data } = config;

    if (type === "pie" || type === "doughnut") {
      const options = renderRound(type, config, data);
      setOptions(options);
    } else if (
      type === "VBar" ||
      type === "HBar" ||
      type === "HStackBar" ||
      type === "VStackBar"
    ) {
      const options = renderBar(type, config, data);
      setOptions(options);
    } else if (type === "stackLine") {
      const options = renderLine(type, config, data);
      setOptions(options);
    }
  };

  useEffect(() => {
    !loading && buildOptions(config);
  }, [config]);

  return (
    <div style={styles ? styles : defaultStyling} className={className}>
      {loading ? (
        <div style={{ minHeight: "15.5rem" }}>
          <Skeleton.Button active size="large" />
          <Skeleton style={{ marginTop: "1rem" }} active />
        </div>
      ) : (
        <ReactECharts
          option={{ ...options, color: color ? color : defaultColor }}
          onEvents={events ? { ...events } : {}}
        />
      )}
    </div>
  );
}

export default ReEChart;
