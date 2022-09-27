import "izitoast/dist/css/iziToast.css";
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PagesProvider from "./providers/PagesProvider";
import StoreProvider from "./providers/StoreProvider";
import { ReadResources } from "./redux/actions/MediaActions";
import { onAuthStateChange } from "./services/Supabase";
import IziToastOptions from "./utils/IzyToastOpcions";
import "./utils/styles/App.scss";

// The next blocks of code are written here for a single run to execute the app
onAuthStateChange();
IziToastOptions();

function App() {
  useEffect(() => {
    ReadResources();
  }, []);

  return (
    <StoreProvider>
      <StrictMode>
        <BrowserRouter basename="/">
          <PagesProvider />
        </BrowserRouter>
      </StrictMode>
    </StoreProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
