import { Checkbox, Form } from "antd";
export interface ICheckbox {
  label: string;
  name: string;
  disable?: boolean;
  handleClick?: () => void;
  className?: string;
  noStyle?: boolean;
}
function ReCheckBox(props: ICheckbox) {
  const { label, name, disable, handleClick, className, noStyle } = props;
  return (
    <Form.Item noStyle={noStyle} name={name} valuePropName="checked">
      <Checkbox className={className} disabled={disable} onClick={handleClick}>
        {label}
      </Checkbox>
    </Form.Item>
  );
}

export default ReCheckBox;
