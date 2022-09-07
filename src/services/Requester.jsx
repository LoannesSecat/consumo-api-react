import { MessageAlert } from "~/redux/actions/ToolActions";
import Dispatch from "~/utils/MyDispatch";

export default async function Requester({ request, action }) {
  Dispatch({ type: action, payload: "loading" });

  if (navigator.onLine) {
    try {
      const response = [fetch(request).then((e) => e.json())];

      return Promise
        .allSettled(response)
        .then((e) => ({
          type: action,
          ...e[0],
        }));
    } catch (error) {
      MessageAlert({ msg: error.message, color: "red" });
    }
  }

  if (!navigator.onLine) MessageAlert({ msg: "Sin conexión a internet", color: "red" });
}
