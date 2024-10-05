import { Button, Form, FormInstance, Space } from "antd";
import { ReactNode, useState } from "react";
interface IProps {
  layout?: "horizontal" | "vertical" | "inline";
  formInstance: FormInstance;
  resetBtn?: boolean;
  submitBtn?: boolean;
  submitBtnText?: string;
  onSubmit: (values: unknown) => void;
  onChange?: (changedValues: unknown, allValues: unknown) => void;
  children: ReactNode;
  initialFormValues?: unknown;
  formClassName?: string;
  fieldsClassName?: string;
  resetFieldsAfterSubmit?: boolean;
  disable?: boolean;
}
function ReForm(props: IProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    layout,
    resetBtn,
    submitBtn,
    onSubmit,
    onChange,
    children,
    formClassName,
    fieldsClassName,
    formInstance,
    submitBtnText,
    resetFieldsAfterSubmit,
    disable,
  } = props;

  const onFinish = async (values: unknown) => {
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
    if (resetFieldsAfterSubmit) {
      formInstance.resetFields();
    }
  };

  const handleFormValuesChange = (
    changedValues: unknown,
    allValues: unknown
  ) => {
    if (onChange) {
      onChange(changedValues, allValues);
    }
  };

  return (
    <Form
      form={formInstance}
      onFinish={onFinish}
      layout={layout || "vertical"}
      onValuesChange={handleFormValuesChange || {}}
      labelCol={{ span: 12 }}
      className={formClassName}
      disabled={disable}
    >
      <div className={fieldsClassName}>{children}</div>
      {(submitBtn || resetBtn) && (
        <Form.Item>
          <Space direction="horizontal">
            {submitBtn && (
              <Button type="primary" htmlType="submit" loading={submitting}>
                {submitBtnText ? submitBtnText : "Submit"}
              </Button>
            )}
            {resetBtn && <Button htmlType="reset">Reset</Button>}
          </Space>
        </Form.Item>
      )}
    </Form>
  );
}

export default ReForm;
