import { Menu } from "antd";
import { IReMenuProps } from "./Interfaces/ReComponents.interface";

export default function ReMenu(props: IReMenuProps) {
  const { mode, className, items, onClick, theme } = props;
  return (
    <Menu
      className={className}
      mode={mode}
      items={items}
      onClick={onClick}
      theme={theme ? theme : "light"}
    />
  );
}
