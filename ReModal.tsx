import { Modal } from "antd";

function ReModal(props: {
  children: any;
  title?: string | React.ReactNode;
  visibility?: boolean;
  footer?: boolean | React.ReactNode;
  onOkay?: Function;
  onCancel: Function;
  width?: number;
  height?: number;
  closable?: boolean;
  onOkayBtnTitle?: string;
  centered?: boolean;
}) {
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
      bodyStyle={{maxHeight: `${height || 500}px`, overflow: "scroll"}}
    >
      {children}
    </Modal>
  );
}

export default ReModal;
