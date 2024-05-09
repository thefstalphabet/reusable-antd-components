import { Form, Radio } from "antd";
import {
  IRadioItem,
  IReRadioGroupProps,
} from "../Interfaces/ReComponents.interface";

function ReRadioGroup(props: IReRadioGroupProps) {
  const { label, name, disable, items, noStyle, defaultValue } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      noStyle={noStyle}
      initialValue={defaultValue}
    >
      <Radio.Group disabled={disable}>
        {items.map((item: IRadioItem) => {
          const { title, value, disable } = item;
          return (
            <Radio value={value} disabled={disable}>
              {title}
            </Radio>
          );
        })}
      </Radio.Group>
    </Form.Item>
  );
}

export default ReRadioGroup;
