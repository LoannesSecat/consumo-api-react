import { MessageAlert } from "../redux/actions/ToolActions";
import RequestMode from "./RequestMode";
import Dispatch from "../utils/useDispatch";

export default async function Soliciter({ request, mock, action }) {
  Dispatch({ type: action, payload: "loading" });

  if (RequestMode.currentMode() === "test") return { type: action, data: mock };

  if (navigator.onLine) {
    try {
      const res = await fetch(request);
      return res.json().then(el => { return { type: action, data: el } })
    } catch (err) {
      MessageAlert({ msg: err.message, color: "red" })
    }
  }

  if (!navigator.onLine) MessageAlert({ msg: "Sin conexión a internet", color: "red" });
}
