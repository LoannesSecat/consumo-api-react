import { useLocation } from "wouter";
import styles from "./go-back-button.module.scss";

export default function GoBackButton({ onClick, children, className }) {
  const [, navigate] = useLocation();
  const customOnClick = onClick ?? (() => { history.back(); });
  const customText = children ?? "Volver";

  return history.length > 1
    ? (
      <button
        className={`${styles.go_back_button} ${className ?? ""}`.trim()}
        onClick={customOnClick}
        type="button"
      >
        {customText}
      </button>
    )
    : (
      <button
        className={`${styles.go_back_button} ${className ?? ""}`.trim()}
        onClick={() => navigate("/")}
        type="button"
      >
        Volver al inicio
      </button>
    );
}
