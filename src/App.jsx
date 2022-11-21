import "izitoast/dist/css/iziToast.css";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useSelector } from "react-redux";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import MediaDetails from "./pages/MediaDetails";
import PageNotFound from "./pages/PageNotFound";
import ResetPassword from "./pages/ResetPassword";
import UserFavorites from "./pages/UserFavorites";
import UserLogIn from "./pages/UserLogIn";
import UserRegistration from "./pages/UserRegistration";
import UserSettings from "./pages/UserSettings";
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

  const SESSION = useSelector((state) => state.user.SESSION);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={UserLogIn} />
      <Route path="/registration" component={UserRegistration} />
      <Route path="/media-details" component={MediaDetails} />
      <Route path="/reset-password" component={ResetPassword} />
      {
        SESSION
          ? (
            <>
              <Route path="/settings" component={UserSettings} />
              <Route path="/favorites" component={UserFavorites} />
            </>
          )
          : null
      }
      <Route path="/:path" component={PageNotFound} />
    </Switch>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<StoreProvider><App /></StoreProvider>);
