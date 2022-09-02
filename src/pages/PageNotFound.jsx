import { useLocation } from "wouter";
import "~/utils/styles/PageNotFound.scss";

export default function PageNotFound({ params }) {
  const [, navigate] = useLocation();

  return (
    <div className="PageNotFound">
      <div>
        <h2 className="border">Página "{params.unknownPage}" no encontrada</h2>
        <h2 className="wave">Página "{params.unknownPage}" no encontrada</h2>
      </div>

      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
}
