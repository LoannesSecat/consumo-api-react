import iziToast from "izitoast";

export default async function MyFetch({ path }) {
  if (!navigator.onLine) {
    iziToast.error({ message: "No hay conexión a Internet" });
  }

  if (navigator.onLine) {
    const initialRes = await fetch(path)
      .then((res) => {
        if (!res.ok) iziToast.error({ message: "Estado de la petición no OK" });

        return res;
      })
      .catch((error) => {
        iziToast.error({ message: `Problemas al realizar la petición - ${error}` });
      });

    const dataRes = await initialRes.json();

    return { response: initialRes, data: dataRes };
  }
}
