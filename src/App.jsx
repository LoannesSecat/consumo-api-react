import "izitoast/dist/css/iziToast.css";
import ReactDOM from "react-dom/client";
import Routes from "./components/Routes";
import { toastInicializer } from "./utils/functions";

toastInicializer();

function App() {
  return (
    <Routes />
  )
}

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<App />);
