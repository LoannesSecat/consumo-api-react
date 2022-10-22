import { useLocation, useNavigate } from "react-router-dom";
import "~/utils/styles/GoBackButton.scss";

export default function GoBackButton({ onClick, children }) {
  const navigate = useNavigate();
  const customOnClick = onClick ?? (() => { navigate(-1); });
  const customText = children ?? "Volver";
  const { key } = useLocation();

  return key !== "default"
    ? <button className="go-back-button" onClick={customOnClick}>{customText}</button>
    : <button className="go-back-button" onClick={() => navigate("/")}>Volver al inicio</button>;
}
