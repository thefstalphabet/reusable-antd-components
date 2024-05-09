import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button, UploadProps, Form } from "antd";
import React, { useEffect, useState } from "react";
import { IReUploadProps } from "../Interfaces/ReComponents.interface";

function ReUpload(props: IReUploadProps) {
  const {
    label,
    name,
    required,
    BtnIcon,
    fileList,
    fileListMaxCount,
    onBeforeUpload,
    onRemove,
    BtnTitle,
    disable,
    accept,
    errorMessage,
    multiple,
  } = props;
  const [rules, setRules] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    setRules(required ? [{ required: true, message: errorMessage }] : []);
  }, []);

  const uploadprops: UploadProps = {
    beforeUpload: async (fileData: any) => {
      setUploading(true);
      await onBeforeUpload(fileData);
      setUploading(false);
      return true;
    },
    onRemove: (fileData: any) => {
      onRemove(fileData);
    },
    fileList,
    disabled: uploading,
    maxCount: fileListMaxCount,
    multiple: multiple,
    accept: accept,
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Upload {...uploadprops}>
        <Button
          disabled={disable}
          icon={BtnIcon ? BtnIcon : <UploadOutlined />}
        >
          {BtnTitle}
        </Button>
      </Upload>
    </Form.Item>
  );
}

export default ReUpload;
