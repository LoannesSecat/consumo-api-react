import { MessageAlert } from "@/actions/ToolActions";

const Soliciter = async (request) => {
  if (navigator.onLine) {
    return fetch(request)
      .then((res) => res.json())
      .catch((err) =>
        MessageAlert({ msg: err.message /* err.stack */, color: "red" })
      );
  } else {
    MessageAlert({ msg: "Sin conexión a internet", color: "red" });
  }
};

export default Soliciter;
