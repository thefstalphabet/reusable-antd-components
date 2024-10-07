import { notification } from "antd";
export interface IReNotificationConfig {
  header?: string
  description: string,
  duration?: number,
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
  type: "success" | "error" | "info" | "warning",
}
export const ReNotification = (config: IReNotificationConfig) => {
  const { header, description, type, duration, placement } = config
  notification[`${type}`]({
    message: header,
    description: description,
    duration: duration ? duration : 0,
    placement: placement ? placement : "bottomLeft"
  });
};
