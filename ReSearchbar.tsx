import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import { useState } from "react";

export default function ReSearchbar(props: {
  className?: string;
  placeholder?: string;
  size: "small" | "large";
  onSubmit: (searchTerm: string) => void;
  onChange?: (searchTerm: string) => void;
}) {
  const { className, placeholder, size, onSubmit, onChange } = props;

  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const handleEnterHits = (e: any) => {
    if (e?.key === "Enter") {
      onSubmit(searchTerm);
    }
  };
  return (
    <Input
      size={size}
      placeholder={placeholder}
      className={className}
      onChange={(e) => {
        setSearchTerm(e?.target?.value);
        onChange && onChange(e?.target?.value);
      }}
      onPressEnter={handleEnterHits}
      prefix={
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ marginRight: "5px" }}
        />
      }
    />
  );
}
