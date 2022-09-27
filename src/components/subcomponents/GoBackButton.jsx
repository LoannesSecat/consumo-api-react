import { useNavigate } from "react-router-dom";
import "~/utils/styles/GoBackButton.scss";

export default function GoBackButton() {
  const navigate = useNavigate();

  return (<button className="go-back-button" onClick={() => { navigate(-1); }}>Volver</button>);
}
