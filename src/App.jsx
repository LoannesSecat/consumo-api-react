import "izitoast/dist/css/iziToast.css";
import ReactDOM from "react-dom/client";
import "~/styles/global.scss";
import Routes from "./components/Routes";
import { getStore, toastInicializer } from "./utils/functions";

getStore("user").authStateChange();
toastInicializer();

function App() {
  return (
    <Routes />
  )
}

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<App />);
