import { useNavigate, useParams } from "react-router-dom";
import styles from "~/utils/styles/page-not-found.module.scss";

export default function PageNotFound() {
  const PARAMS = useParams();
  const navigate = useNavigate();
  const UNKNOWN_PAGE = PARAMS["*"];

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

      <button onClick={() => { navigate("/"); }}>Volver al inicio</button>
    </main>
  );
}
