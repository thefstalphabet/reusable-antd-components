import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";

interface IItems {
  title: string;
  value: string | number | boolean;
}

function ReSelect(props: {
  allowClear?: boolean;
  noStyle?: boolean;
  label: string;
  name: string;
  items: IItems[];
  type?: "multiple" | "tags" | undefined;
  searchable?: boolean;
  required?: boolean;
  disable?: boolean;
  onChange?: Function;
  form?: any;
  placeholder?: string;
  autoFocus?: boolean;
  styles?: any;
}) {
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
    form,
    onChange,
    placeholder,
    styles,
  } = props;
  const [dropDownoptions, setDropDownoptions] = useState<IItems[]>([]);
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    setDropDownoptions(items);
  }, [items]);

  useEffect(() => {
    setRules(
      required ? [{ required: true, message: `Please enter the ${label}` }] : []
    );
  }, [required, disable, form]);

  const handleOnChange = (changedValues: any, allValues: any) => {
    onChange && onChange(changedValues, allValues);
  };

  const handleSearch = (value: string) => {
    if (searchable && value?.length) {
      let filterOptions: IItems[] = [];
      items?.forEach((data) => {
        if (data.title.toLowerCase().includes(value.toLowerCase())) {
          filterOptions.push(data);
        }
      });
      setDropDownoptions(filterOptions);
    }
    if (value?.length === 0) {
      setDropDownoptions(items);
    }
  };

  return (
    <Form.Item label={label} name={name} rules={rules} noStyle={noStyle}>
      <Select
        style={styles}
        disabled={disable}
        allowClear={allowClear === undefined ? true : allowClear}
        mode={type}
        autoFocus={autoFocus}
        showSearch={searchable}
        onChange={handleOnChange}
        placeholder={placeholder || ""}
        onSearch={(e) => {
          handleSearch(e);
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {dropDownoptions.map((item: any) => {
          const { value, title } = item;
          return (
            <Select.Option value={value} disabled={item?.disable || false}>
              {title}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
}

export default ReSelect;
