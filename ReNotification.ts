import { notification } from "antd";
import { IReNotificationConfig } from "./Interfaces/ReComponents.interface";

export const ReNotification = (config: IReNotificationConfig) => {
  const { header, description, type, duration, placement } = config
  notification[`${type}`]({
    message: header,
    description: description,
    duration: duration ? duration : 0,
    placement: placement ? placement : "bottomLeft"
  });
};
