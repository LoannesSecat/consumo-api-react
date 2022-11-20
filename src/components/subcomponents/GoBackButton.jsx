import { useLocation, useNavigate } from "react-router-dom";
import styles from "~/utils/styles/go-back-button.module.scss";

export default function GoBackButton({ onClick, children, className }) {
  const navigate = useNavigate();
  const customOnClick = onClick ?? (() => { navigate(-1); });
  const customText = children ?? "Volver";
  const { key } = useLocation();

  return key !== "default"
    ? <button className={`${styles.go_back_button} ${className ?? ""}`.trim()} onClick={customOnClick}>{customText}</button>
    : <button className={`${styles.go_back_button} ${className ?? ""}`.trim()} onClick={() => navigate("/")}>Volver al inicio</button>;
}
