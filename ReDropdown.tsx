import { Dropdown } from "antd";
import { IReDropdownProps } from "./Interfaces/ReComponents.interface";

function ReDropdown(props: IReDropdownProps) {
  const { className, items, child } = props;

  return <Dropdown menu={{ items }}>{child}</Dropdown>;
}

export default ReDropdown;
