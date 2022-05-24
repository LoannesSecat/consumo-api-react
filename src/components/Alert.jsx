import "@/utils/styles/Alert.scss";
import { useEffect } from "react";
import { MessageAlert } from "@/actions/ToolActions";
import useStore from "@/hooks/useStore";

const Alert = () => {
  const { msg, color } = useStore({ reducer: "tool", value: "alertMessage" });

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
};

export default Alert;
