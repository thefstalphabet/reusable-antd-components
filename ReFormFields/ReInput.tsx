import { Form, FormInstance, Input, InputNumber } from "antd";
import { useState, useEffect, ReactNode } from "react";
import { Rule } from "antd/es/form";
interface IInputField {
  label: string;
  name: string;
  type: "string" | "email" | "password" | "textArea" | "number" | "url";
  required?: boolean;
  form?: FormInstance;
  min?: number;
  max?: number;
  disable?: boolean;
  noStyle?: boolean;
  placeholder?: string;
  prefix?: React.ReactNode;
  size?: "large" | "middle" | "small";
  className?: string;
  variant?: "outlined" | "borderless" | "filled";
}
function ReInput(props: IInputField) {
  const {
    label,
    name,
    type,
    required,
    min,
    max,
    disable,
    noStyle,
    placeholder,
    prefix,
    form,
    className,
    variant,
  } = props;
  const defaultProps = {
    variant: variant || "outlined",
    style: { width: "100%" },
    className: className,
    disabled: disable,
    placeholder: placeholder,
    prefix: prefix,
  };
  const [rules, setRules] = useState<Rule[]>([]);
  const [element, setElement] = useState<ReactNode>(
    <Input type={type} {...defaultProps} />
  );

  useEffect(() => {
    switch (type) {
      case "number":
        setElement(<InputNumber {...defaultProps} />);
        break;
      case "textArea":
        setElement(<Input.TextArea showCount maxLength={max} allowClear />);
        break;
      default:
        break;
    }

    switch (type) {
      case "email":
        setRules([
          { type: type, message: "Please enter a valid Email", required },
        ]);
        break;
      case "textArea":
        setRules([
          { type: "string", message: `Please enter ${label}`, required },
        ]);
        break;
      case "url":
        setRules([
          { type: type, message: "Please enter a valid url", required },
        ]);
        break;
      case "number":
        setRules([{ type: type, message: `Please enter ${label}`, required }]);
        break;
      case "string":
        setRules([
          { type: type, message: `Please enter a ${label}`, required },
        ]);
        if (min) {
          setRules((pre: Rule[]) => [
            ...pre,
            {
              min: min,
              message: `${label} must be at least ${min} characters`,
            },
          ]);
        }
        if (max) {
          setRules((pre: Rule[]) => [
            ...pre,
            {
              max: max,
              message: `${label} at max ${max} characters`,
            },
          ]);
        }
        break;
      default:
        break;
    }
  }, [disable, required, form]);

  return (
    <Form.Item label={label} name={name} rules={rules} noStyle={noStyle}>
      {element}
    </Form.Item>
  );
}

export default ReInput;
