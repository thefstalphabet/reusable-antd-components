import { useEffect, useState } from "react";
import { DatePicker, Form } from "antd";
import moment from "moment";

function ReDatePicker(props: {
  allowClear?: boolean;
  noStyle?: boolean;
  label: string;
  name: string;
  required?: boolean;
  form?:any,
  type: "simple" | "rangePicker";
  featureDates?: boolean;
  dateFormat?: string;
  width?: string;
  disable?: boolean;
  lastDate?: Date;
  defaultStartDate?: string;
  onChange?: Function;
}) {
  const {
    label,
    name,
    required,
    featureDates,
    dateFormat,
    type,
    width,
    disable,
    form,
    lastDate,
    noStyle,
    allowClear,
    defaultStartDate,
    onChange
  } = props;
  const { RangePicker } = DatePicker;
  const [rules, setRules] = useState<any[]>([]);

  function disabledFutureDate(current: any) {
    let returnValue;
    returnValue = featureDates && current && current > moment().endOf("day");
    if (lastDate) {
      returnValue =
        featureDates &&
        lastDate &&
        current &&
        (current < moment(lastDate).startOf("day") ||
          current > moment().endOf("day"));
    }
    return returnValue;
  }

  useEffect(() => {
    setRules(
      required
        ? [{ required: true, message: `Please enter the ${label}` }]
        : []
    );
  }, [disable,required,form]);

  const handleOnChange = (value: any) => {
    onChange && onChange(value, name);
  }

  return (
    <Form.Item label={label} name={name} rules={rules} noStyle={noStyle}>
      {type === "simple" ? (
        <DatePicker
          allowClear={allowClear === undefined ? true : allowClear}
          format={dateFormat}
          disabled={disable}
          disabledDate={disabledFutureDate}
          style={{ width: width }}
          onChange={handleOnChange}
        />
      ) : (
        <RangePicker
          defaultValue={
            defaultStartDate ? [moment(defaultStartDate), null] : [null, null]
          }
          allowClear={allowClear === undefined ? true : allowClear}
          disabled={disable}
          format={dateFormat}
          disabledDate={disabledFutureDate}
          style={{ width: width }}
          onChange={handleOnChange}
        />
      )}
    </Form.Item>
  );
}

export default ReDatePicker;
