import { Drawer } from "antd";
import { IReDrawerProps } from "./Interfaces/ReComponents.interface";

function ReDrawer(props: IReDrawerProps) {
  const {
    children,
    title,
    visibility,
    footer,
    onCancel,
    width,
    placement,
    closable,
    extraContent
  } = props;

  return (
    <Drawer
      visible={visibility}
      closable={closable}
      title={title}
      footer={footer}
      placement={placement ? placement : "right"}
      width={width}
      extra={extraContent}
      onClose={() => {
        onCancel && onCancel();
      }}
    >
      {children}
    </Drawer>
  );
}

export default ReDrawer;
