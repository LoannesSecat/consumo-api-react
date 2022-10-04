import { useNavigate } from "react-router-dom";
import "~/utils/styles/GoBackButton.scss";

export default function GoBackButton({ onClick, text }) {
  const navigate = useNavigate();
  const customOnClick = onClick ?? (() => { navigate(-1); });
  const customText = text ?? "Volver";

  return (<button className="go-back-button" onClick={customOnClick}>{customText}</button>);
}
