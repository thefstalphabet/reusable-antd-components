import { Form, Radio } from "antd";

interface IItems {
  title: string;
  value: string | number;
  disable?: boolean;
}

function ReRadioGroup(props: {
  label: string;
  name: string;
  disable?: boolean;
  items: IItems[];
  noStyle?: boolean;
  defaultValue?: string | number 
}) {
  const { label, name, disable, items, noStyle, defaultValue } = props;
  return (
    <Form.Item name={name} label={label} noStyle={noStyle} initialValue={defaultValue}>
      <Radio.Group disabled={disable}>
        {items.map((item: IItems) => {
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
