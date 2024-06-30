import { notification } from "antd";
type NotificationType = 'success' | 'info' | 'warning' | 'error';


export default function notifyHook() {
  const notify = (type: NotificationType ,message: string) => {
    notification[type]({
      message: message,
      placement: 'topRight'
    });
  }
  return {
    notify
  }
}