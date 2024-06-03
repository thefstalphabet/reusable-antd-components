import { useEffect, useState } from "react";
import { DatePicker, Form } from "antd";
import { IReDatePicker } from "../Interfaces/ReComponents.interface";
import dayjs from "dayjs";

function ReDatePicker(props: IReDatePicker) {
  const {
    label,
    name,
    required,
    disableUpcomingDates,
    dateFormat,
    disable,
    form,
    lastDate,
    noStyle,
    allowClear,
    onChange,
  } = props;
  const [rules, setRules] = useState<any[]>([]);

  function disabledFutureDate(current: any) {
    let returnValue;
    returnValue =
      disableUpcomingDates && current && current > dayjs().endOf("day");
    if (lastDate) {
      returnValue =
        disableUpcomingDates &&
        lastDate &&
        current &&
        (current < dayjs(lastDate).startOf("day") ||
          current > dayjs().endOf("day"));
    }
    return returnValue;
  }

  useEffect(() => {
    setRules(
      required ? [{ required: true, message: `Please enter the ${label}` }] : []
    );
  }, [disable, required, form]);

  const handleOnChange = (value: any) => {
    onChange && onChange(value, name);
  };

  return (
    <Form.Item label={label} name={name} rules={rules} noStyle={noStyle}>
      <DatePicker
        allowClear={allowClear === undefined ? true : allowClear}
        format={dateFormat}
        disabled={disable}
        disabledDate={disabledFutureDate}
        onChange={handleOnChange}
        style={{width: "100%"}}
      />
    </Form.Item>
  );
}

export default ReDatePicker;
