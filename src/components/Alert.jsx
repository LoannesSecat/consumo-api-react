import "../utils/styles/Alert.scss";
import { useEffect } from "react";
import { MessageAlert } from "../redux/actions/ToolActions";
import { useSelector } from "react-redux";

export default function Alert() {
  const { msg, color } = useSelector((e) => e.tool.alertMessage);

  useEffect(() => {
    setTimeout(() => {
      MessageAlert({ msg: "", color: "" });
    }, 5000);
  }, [msg]);

  if (msg === "") {
    return null;
  } else {
    return (
      <div style={{ backgroundColor: color }} className="Alert">
        {msg}
      </div>
    );
  }
}
