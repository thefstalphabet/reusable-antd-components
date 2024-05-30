import { Button, Form, Space } from "antd";
import { useState, useEffect } from "react";
import { IReFormProps } from "./Interfaces/ReComponents.interface";

function ReForm(props: IReFormProps) {
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

  const onFinish = async (values: any) => {
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
    resetFieldsAfterSubmit && formInstance.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Form validation failed:", errorInfo);
  };

  const handleFormValuesChange = (changedValues: any, allValues: any) => {
    onChange && onChange(changedValues, allValues);
  };

  return (
    <Form
      form={formInstance}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout={layout ? layout : "vertical"}
      onValuesChange={handleFormValuesChange}
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
