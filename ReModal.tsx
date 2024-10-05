import { Modal } from "antd";
import { ReactNode } from "react";
export interface IProps {
  children: ReactNode;
  title?: string | React.ReactNode;
  visibility?: boolean;
  footer?: boolean | React.ReactNode;
  onOkay?: (close: unknown) => void;
  onCancel: (close: unknown) => void;
  closable?: boolean;
  onOkayBtnTitle?: string;
  centered?: boolean;
  width?: string;
}
function ReModal(props: IProps) {
  const {
    children,
    onOkay,
    title,
    visibility,
    footer,
    onCancel,
    closable,
    onOkayBtnTitle,
    centered,
    width,
  } = props;

  return (
    <Modal
      width={width}
      closable={closable}
      title={title}
      centered={centered}
      open={visibility}
      okText={onOkayBtnTitle}
      onOk={onOkay}
      onCancel={onCancel}
      footer={footer}
    >
      {children}
    </Modal>
  );
}

export default ReModal;
