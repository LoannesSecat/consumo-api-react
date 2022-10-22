import "izitoast/dist/css/iziToast.css";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PagesProvider from "./providers/PagesProvider";
import StoreProvider from "./providers/StoreProvider";
import { ReadResources } from "./redux/actions/MediaActions";
import { AuthStateChange } from "./services/Supabase";
import "./utils/styles/App.scss";

// The next blocks of code are written here for a single run to execute the app
AuthStateChange();

function App() {
  useEffect(() => {
    ReadResources();
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
