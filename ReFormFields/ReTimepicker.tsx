import { Form, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { IReTimepickerProps } from "../Interfaces/ReComponents.interface";

function ReTimepicker(props: IReTimepickerProps) {
  const {
    noStyle,
    label,
    name,
    required,
    disable,
    allowClear,
    className,
    format,
    placeholder
  } = props;
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    setRules(
      required ? [{ required: true, message: `Please enter the ${label}` }] : []
    );
  }, [required]);

  return (
    <Form.Item label={label} name={name} rules={rules} noStyle={noStyle}>
      <TimePicker.RangePicker
      needConfirm={false}
        style={{ width: "100%" }}
        disabled={disable}
        allowClear={allowClear}
        className={className}
        format={format ? format : "HH:mm:ss a"}
        placeholder={placeholder}
      />
    </Form.Item>
  );
}

export default ReTimepicker;
