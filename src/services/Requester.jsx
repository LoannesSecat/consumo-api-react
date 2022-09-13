import { MessageAlert } from "~/redux/actions/ToolActions";

export async function MyFetch(url) {
  try {
    const response = [
      fetch(url).then((e) => {
        if (!e.ok) {
          MessageAlert({ msg: "Error en la respuesta de TMDB", color: "red" });
        }

        return e.json();
      }),
    ];

    return Promise
      .allSettled(response)
      .then((e) => e[0]);
  } catch (error) {
    MessageAlert({ msg: error.message, color: "red" });
  }
}

export default async function Requester({ request, action }) {
  if (navigator.onLine) {
    return MyFetch(request).then((element) => ({ type: action, ...element }));
  }

  if (!navigator.onLine) MessageAlert({ msg: "Sin conexión a internet", color: "red" });
}
