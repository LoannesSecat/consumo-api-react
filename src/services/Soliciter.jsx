import { MessageAlert } from "@/actions/ToolActions";

const Soliciter = async (request) => {
  return fetch(request)
    .then((res) => res.json())
    .catch((err) => MessageAlert({ msg: err.message, color: "red" }));
};

export default Soliciter;
