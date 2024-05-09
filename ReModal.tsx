import { Modal } from "antd";
import { IReMOdalProps } from "./Interfaces/ReComponents.interface";

function ReModal(props: IReMOdalProps) {
  const {
    children,
    onOkay,
    title,
    visibility,
    footer,
    onCancel,
    width,
    height,
    closable,
    onOkayBtnTitle,
    centered,
  } = props;

  return (
    <Modal
      width={width ? width : 800}
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
      bodyStyle={{ maxHeight: `${height || 500}px`, overflow: "scroll" }}
    >
      {children}
    </Modal>
  );
}

export default ReModal;
