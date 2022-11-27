import { useLocation } from "wouter";
import styles from "~/utils/styles/page-not-found.module.scss";

export default function PageNotFound({ params }) {
  const [, navigate] = useLocation();
  const UNKNOWN_PAGE = params.path;

  return (
    <main className={styles.page_not_found}>
      <div>
        <h2 className={styles.border}>
          La ruta
          {" "}
          /
          {UNKNOWN_PAGE}
          {" "}
          no es válida
        </h2>
        <h2 className={styles.wave}>
          La ruta
          {" "}
          /
          {UNKNOWN_PAGE}
          {" "}
          no es válida
        </h2>
      </div>

      <button onClick={() => { navigate("/"); }} type="button">Volver al inicio</button>
    </main>
  );
}
