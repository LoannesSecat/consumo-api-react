import { useNavigate, useParams } from "react-router-dom";
import "~/utils/styles/PageNotFound.scss";

export default function PageNotFound() {
  const PARAMS = useParams();
  const navigate = useNavigate();
  const UNKNOWN_PAGE = PARAMS["*"];

  return (
    <div className="page-not-found">
      <div>
        <h2 className="border">
          La ruta
          {" "}
          /
          {UNKNOWN_PAGE}
          {" "}
          no es válida
        </h2>
        <h2 className="wave">
          La ruta
          {" "}
          /
          {UNKNOWN_PAGE}
          {" "}
          no es válida
        </h2>
      </div>

      <button onClick={() => { navigate("/"); }}>Volver al inicio</button>
    </div>
  );
}
