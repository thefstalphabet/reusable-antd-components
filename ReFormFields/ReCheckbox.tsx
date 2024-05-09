import { Checkbox, Form } from "antd";
import { ICheckbox } from "../Interfaces/ReComponents.interface";

function ReCheckBox(props: ICheckbox) {
  const { label, name, disable, handleClick } = props;
  return (
    <Form.Item name={name} valuePropName="checked">
      <Checkbox disabled={disable} onClick={handleClick}>{label}</Checkbox>
    </Form.Item>
  );
}

export default ReCheckBox;
