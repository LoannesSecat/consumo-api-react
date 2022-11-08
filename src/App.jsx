import "izitoast/dist/css/iziToast.css";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PagesProvider from "./providers/PagesProvider";
import StoreProvider from "./providers/StoreProvider";
import { ReadResources } from "./services/MediaServices";
import { AuthStateChange } from "./services/supabase";
import "./utils/styles/App.scss";

// The next blocks of code are written here for a single run to execute the app
AuthStateChange();

function App() {
  useEffect(() => {
    ReadResources();

    return () => {
      localStorage.removeItem("GLOBAL_STORAGE");
    };
  }, []);

  return (
    <StoreProvider>
      <BrowserRouter basename="/">
        <PagesProvider />
      </BrowserRouter>
    </StoreProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
