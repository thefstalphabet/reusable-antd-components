import { Form, FormInstance, Select } from "antd";
import { OptionProps } from "antd/es/select";
import { CSSProperties, useEffect, useState } from "react";

export interface ISelectOptions {
  label: string;
  value: string;
}
export interface IProps {
  allowClear?: boolean;
  noStyle?: boolean;
  label: string;
  name: string;
  items: ISelectOptions[];
  type?: "multiple" | "tags" | undefined;
  searchable?: boolean;
  required?: boolean;
  disable?: boolean;
  onChange?: (value: string, option: OptionProps | Array<OptionProps>) => void;
  form?: FormInstance;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  variant?: "outlined" | "borderless" | "filled";
  dropdownStyle?: CSSProperties;
}
function ReSelect(props: IProps) {
  const {
    allowClear,
    noStyle,
    label,
    name,
    items,
    type,
    required,
    searchable,
    autoFocus,
    disable,
    onChange,
    placeholder,
    className,
    variant,
    dropdownStyle,
  } = props;
  const [dropDownoptions, setDropDownoptions] = useState<ISelectOptions[]>([]);

  useEffect(() => {
    setDropDownoptions(items);
  }, [items]);

  const handleOnChange = (
    value: string,
    option: OptionProps | Array<OptionProps>
  ) => {
    if (onChange) {
      onChange(value, option);
    }
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required, message: `Please enter the ${label}` }]}
      noStyle={noStyle}
    >
      <Select
        dropdownStyle={dropdownStyle}
        variant={variant || "outlined"}
        className={className}
        disabled={disable}
        allowClear={allowClear}
        mode={type}
        autoFocus={autoFocus}
        showSearch={searchable}
        onChange={handleOnChange}
        placeholder={placeholder || ""}
      >
        {dropDownoptions?.map((item: ISelectOptions) => {
          const { value, label } = item;
          return <Select.Option value={value}>{label}</Select.Option>;
        })}
      </Select>
    </Form.Item>
  );
}

export default ReSelect;
