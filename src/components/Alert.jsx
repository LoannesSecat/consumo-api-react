import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MessageAlert } from "~/redux/actions/ToolActions";
import "~/utils/styles/Alert.scss";

export default function Alert() {
  const alertMessage = useSelector((e) => e.tool.alertMessage);
  const { msg, color } = alertMessage;

  useEffect(() => {
    setTimeout(() => {
      MessageAlert({ msg: "", color: "" });
    }, 5000);
  }, [msg]);

  if (msg === "") {
    return null;
  }

  return (
    <div style={{ backgroundColor: color }} className="Alert">
      {msg}
    </div>
  );
}
