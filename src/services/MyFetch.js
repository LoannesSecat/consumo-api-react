import { envVars } from "~/utils/constants";
import { useToast } from "~/utils/functions";

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

    useToast.error({ message: msg });

    return {
      response: {
        ok: false
      },
      data: []
    }
  }
}
