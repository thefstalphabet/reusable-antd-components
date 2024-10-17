import { Input } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function ReSearchbar(props: {
  className?: string;
  placeholder?: string;
  size: "small" | "large";
  onSubmit: (searchTerm: string) => void;
  onChange?: (searchTerm: string) => void;
  allowClear?: boolean;
}) {
  const { className, placeholder, size, onSubmit, onChange, allowClear } =
    props;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleEnterHits = (e: any) => {
    if (e?.key === "Enter") {
      onSubmit(searchTerm);
    }
  };
  return (
    <Input
      allowClear={allowClear}
      size={size}
      placeholder={placeholder}
      className={className}
      onChange={(e) => {
        setSearchTerm(e?.target?.value);
        onChange && onChange(e?.target?.value);
      }}
      onPressEnter={handleEnterHits}
      prefix={<IoSearch style={{ marginRight: "5px", color: "#bfbfbf" }} />}
    />
  );
}
