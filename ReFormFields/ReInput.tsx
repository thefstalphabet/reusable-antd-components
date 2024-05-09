import { Form, Input, InputNumber } from "antd";
import { useState, useEffect } from "react";
import { IInputField } from "./Interface";

function ReInput(props: IInputField) {
  const {
    label,
    name,
    type,
    required,
    min,
    max,
    textAreaWordLimit,
    disable,
    noStyle,
    placeholder,
    prefix,
    textAreaOptions,
    maxLength,
    width,
    form,
    onChange,
    styles,
  } = props;
  const [rules, setRules] = useState<any[]>([]);
  const [element, setElement] = useState<any>();

  useEffect(() => {
    setRules(
      required ? [{ required: true, message: `Please enter the ${label}` }] : []
    );

    switch (type) {
      case "email":
      case "simple":
      case "url":
        setElement(
          <Input
            style={{ width: width ? width : "100%", ...styles }}
            disabled={disable}
            placeholder={placeholder || ""}
            prefix={prefix}
            maxLength={maxLength}
            onChange={onChange}
          />
        );
        break;
      case "password":
        setElement(
          <Input.Password
            style={styles}
            disabled={disable}
            placeholder={placeholder || ""}
            prefix={prefix}
            onChange={onChange}
          />
        );
        break;
      case "number":
        setElement(
          <InputNumber
            disabled={disable}
            style={{ width: width ? width : "100%", ...styles }}
            placeholder={placeholder || ""}
            prefix={prefix}
            min={min}
            max={max}
            onChange={onChange}
          />
        );
        break;
      case "textArea":
        setElement(
          <Input.TextArea
            style={styles}
            showCount
            maxLength={textAreaWordLimit}
            rows={textAreaOptions?.rowSize || 4}
            autoSize={
              !textAreaOptions?.textAreaResize && {
                minRows: textAreaOptions?.rowSize || 4,
                maxRows: textAreaOptions?.rowSize || 4,
              }
            }
            allowClear
            disabled={disable}
            placeholder={placeholder || ""}
            onChange={onChange}
          />
        );
        break;
      default:
        break;
    }

    switch (type) {
      case "email":
        setRules((pre: any) => [
          ...pre,
          { type: type, message: "Please enter a valid E-mail ID" },
        ]);
        break;
      case "url":
        setRules((pre: any) => [
          ...pre,
          { type: type, message: "Please enter a valid url" },
        ]);
        break;
      case "simple":
        if (min) {
          setRules((pre: any) => [
            ...pre,
            {
              min: min,
              message: `${label} must be at least ${min} characters`,
            },
          ]);
        }
        if (max) {
          setRules((pre: any) => [
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
