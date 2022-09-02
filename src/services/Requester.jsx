import { MessageAlert } from "~/redux/actions/ToolActions";
import RequestMode from "./RequestMode";
import Dispatch from "~/utils/useDispatch";

export default async function Requester({ request, mock, action }) {
  Dispatch({ type: action, payload: "loading" });

  if (RequestMode.currentMode() === "test") return { type: action, value: mock };

  if (navigator.onLine) {
    try {
      const response = [fetch(request).then(e => e.json())];

      return Promise
        .allSettled(response)
        .then(e => {
          return {
            type: action,
            ...e[0]
          }
        })
    } catch (error) {
      MessageAlert({ msg: error.message, color: "red" })
    }
  }

  if (!navigator.onLine) MessageAlert({ msg: "Sin conexión a internet", color: "red" });
}