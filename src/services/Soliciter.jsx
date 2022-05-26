import { MessageAlert } from "../actions/ToolActions";
import RequestMode from "../services/RequestMode";
import useDispatch from "../hooks/useDispatch";

const Soliciter = async ({ request, mock, action }) => {
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
};

export default Soliciter;
