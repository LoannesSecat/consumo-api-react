import { useSuperState } from "@superstate/react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.css";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import MediaDetails from "./pages/MediaDetails";
import PageNotFound from "./pages/PageNotFound";
import ResetPassword from "./pages/ResetPassword";
import UserFavorites from "./pages/UserFavorites";
import UserLogIn from "./pages/UserLogIn";
import UserRegistration from "./pages/UserRegistration";
import UserSettings from "./pages/UserSettings";
import { AuthStateChange } from "./services/supabase";
import MediaC from "./superstate/Media";
import UserC from "./superstate/User";
import "./utils/styles/App.scss";

// The next blocks of code are written here for a single run to execute the app
AuthStateChange();
iziToast.settings({
  position: "bottomCenter",
  progressBar: false,
  messageSize: "17",
  timeout: 3000,
  pauseOnHover: false,
});

const { readMedia } = MediaC;

function App() {
  useEffect(() => {
    readMedia();
  }, []);

  const { SESSION } = UserC.state.now();
  useSuperState(UserC.state);

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

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<App />);
