import { Upload, UploadProps, Form, UploadFile } from "antd";
import { ReactNode, useState } from "react";
interface Iprops {
  label: string;
  name: string;
  required?: boolean;
  fileList: UploadFile<File>[];
  fileListMaxCount: number;
  beforeUpload: (file: File, fileList?: File[]) => void;
  onRemove: (
    file: UploadFile<File>
  ) => boolean | void | Promise<boolean | void>;
  disable?: boolean;
  accept?: string;
  errorMessage?: string;
  multiple?: boolean;
  uploadIcon?: ReactNode;
  listType?: "picture-card" | "picture-circle" | "text";
}
function ReUpload(props: Iprops) {
  const {
    label,
    name,
    required,
    fileList,
    fileListMaxCount,
    beforeUpload,
    onRemove,
    accept,
    uploadIcon,
    multiple,
    listType,
  } = props;
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadprops: UploadProps = {
    beforeUpload: async (fileData: File) => {
      setUploading(true);
      await beforeUpload(fileData);
      setUploading(false);
      return true;
    },
    onRemove,
    fileList,
    disabled: uploading,
    maxCount: fileListMaxCount,
    multiple: multiple,
    accept: accept,
    listType: listType,
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: `Pleasse enter ${label}`,
          type: "object",
        },
      ]}
    >
      <Upload {...uploadprops}>{uploadIcon}</Upload>
    </Form.Item>
  );
}

export default ReUpload;
