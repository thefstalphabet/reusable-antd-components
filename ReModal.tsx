import { Modal } from "antd";
import { IReModalProps } from "./Interfaces/ReComponents.interface";

function ReModal(props: IReModalProps) {
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
      onOk={() => {
        onOkay && onOkay();
      }}
      onCancel={() => {
        onCancel();
      }}
      footer={footer}
    >
      {children}
    </Modal>
  );
}

export default ReModal;
