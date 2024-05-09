import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Skeleton } from "antd";
import { IProps, ISkeleton, ISpin } from "./Interface";

function ReLoading(props: IProps) {
  const { type, prop } = props;
  const [element, setElement] = useState<any>();

  useEffect(() => {
    switch (type) {
      case "spin":
        const { indicator } = prop as ISpin;
        const defaultIndicator = (
          <LoadingOutlined style={{ fontSize: 50 }} spin />
        );
        setElement(
          <Spin
            indicator={indicator ? indicator : defaultIndicator}
            {...prop}
          />
        );
        break;
      case "skeleton":
        const { loading, active, rows, width } = prop as ISkeleton;
        setElement(
          <Skeleton
            paragraph={{
              rows: rows,
              width: width,
            }}
            loading={loading}
            active={active}
          />
        );
        break;
      default:
        break;
    }
  }, [props]);

  return <div>{element}</div>;
}

export default ReLoading;
