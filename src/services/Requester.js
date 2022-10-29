import MyToast from "~/utils/MyToast";

export async function MyFetch(url) {
  try {
    const response = [
      fetch(url).then((e) => {
        if (!e.ok) {
          throw new Error("Estado de la petición no OK");
        }

        return e.json();
      }),
    ];

    return Promise
      .allSettled(response)
      .then((e) => e[0]);
  } catch (error) {
    MyToast.error({ message: "Problemas en el proceso de petición" });
  }
}

export default async function Requester({ request, action }) {
  if (navigator.onLine) {
    return MyFetch(request).then((element) => ({ type: action, ...element }));
  }

  if (!navigator.onLine) {
    MyToast.error({ message: "No hay conexión a Internet" });
  }
}
