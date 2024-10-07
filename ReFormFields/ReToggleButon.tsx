import { Checkbox, Form, FormInstance } from "antd";
import { ReactNode } from "react";

export default function ReToggleButon(props: {
  formInstance: FormInstance;
  label: string;
  name: string;
  disable?: boolean;
  handleClick?: () => void;
  className?: string;
  noStyle?: boolean;
  themeColor: string;
  icon?: ReactNode;
}) {
  const {
    label,
    name,
    disable,
    noStyle,
    formInstance,
    themeColor,
    className,
    icon,
  } = props;

  return (
    <Form.Item
      noStyle={noStyle}
      label={label}
      name={name}
      valuePropName="checked"
    >
      <label
        className={`static inline-flex items-center cursor-pointer select-none `}
      >
        <Checkbox
          checked={formInstance.getFieldValue(name)}
          onChange={() => {
            formInstance.setFieldValue(name, !formInstance.getFieldValue(name));
          }}
          className="absolute opacity-0 w-0 h-0"
        />
        <div
          className={className}
          style={
            formInstance.getFieldValue(name)
              ? { borderColor: themeColor, color: themeColor }
              : {}
          }
        >
          <div className={`${icon && "flex items-center gap-2"}`}>
            {icon}
            {label}
          </div>
        </div>
      </label>
    </Form.Item>
  );
}
