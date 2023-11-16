import iziToast from "izitoast";
import { envVars } from "~/utils/constants";

export default async function MyFetch({ path }) {
  try {
    const res = await fetch(path, {
      headers: {
        Authorization: `Bearer ${envVars.VITE_TMDB_KEY}`
      }
    });

    const json = await res.json();

    return { response: res, data: json };
  }

  catch (error) {
    let msg = null;

    if (!navigator.onLine) {
      msg = "No hay conexión a Internet";
    }

    if (navigator.onLine) {
      msg = error.message;
    }

    iziToast.error({ message: msg });

    return {
      response: {
        ok: false
      },
      data: []
    }
  }
}
