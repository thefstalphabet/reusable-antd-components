import { Button, Form, FormInstance, Space } from "antd";
import { useState, useEffect } from "react";

function ReusableForm(props: {
  layout?: "horizontal" | "vertical" | "inline";
  formInstance: FormInstance<any>;
  resetBtn?: boolean;
  submitBtn?: boolean;
  submitBtnText?: string;
  onSubmit: Function;
  onChange?: Function;
  children: any;
  initialFormValues?: any | {};
  formStyles?: any;
  fieldsStyles?: any;
  className?: string;
  resetFieldsAfterSubmit?: boolean;
  disable?: boolean;
}) {
  const [submitting, setSubmitting] = useState(false); // form loading while submitting
  const {
    layout,
    resetBtn,
    submitBtn,
    onSubmit,
    onChange,
    children,
    initialFormValues,
    formStyles,
    fieldsStyles,
    formInstance,
    className,
    submitBtnText,
    resetFieldsAfterSubmit,
    disable,
  } = props;

  // It runs when we submit the form
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

  const setInitialValuesOfForm = () => {
    formInstance.setFieldsValue(initialFormValues);
  };

  useEffect(() => {
    setInitialValuesOfForm();
  }, [initialFormValues]);

  return (
    <Form
      form={formInstance}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout={layout ? layout : "vertical"}
      onValuesChange={handleFormValuesChange}
      labelCol={{ span: 12 }}
      style={formStyles}
      className={className}
      disabled={disable}
    >
      <div className="formFields" style={fieldsStyles}>{children}</div>
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

export default ReusableForm;
