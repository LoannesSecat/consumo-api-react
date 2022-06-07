import { MessageAlert } from "../redux/actions/ToolActions";
import RequestMode from "./RequestMode";
import useDispatch from "../utils/useDispatch";

export default async function Soliciter({ request, mock, action }) {
  useDispatch({ type: action, payload: "loading" });

  if (RequestMode === "test") return { type: action, data: mock };

  if (navigator.onLine) {
    return fetch(request)
      .then((res) => res.json())
      .then((json) => {
        return { type: action, data: json };
      })
      .catch((err) => MessageAlert({ msg: err.message, color: "red" }));
  }

  if (!navigator.onLine)
    MessageAlert({ msg: "Sin conexión a internet", color: "red" });
}
