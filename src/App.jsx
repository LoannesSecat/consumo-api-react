import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.css";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import UserLogIn from "./pages/UserLogIn";
import FavoriteMedia from "./pages/favorite-media";
import MediaDetails from "./pages/media-details";
import store from "./store";
import { getStore } from "./utils/functions";
import "./utils/styles/App.scss";

// The next blocks of code are written here for a single run to execute the app
getStore("user").authStateChange();
iziToast.settings({
  position: "bottomCenter",
  progressBar: false,
  messageSize: "17",
  timeout: 3000,
  pauseOnHover: false,
});

function App() {
  const { readMedia } = store.media()
  const { SESSION } = store.user()

  useEffect(() => {
    readMedia();
  }, []);

  // if (SESSION) {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/media-details" component={MediaDetails} />
      {/* <Route path="/settings" component={UserSettings} /> */}
      <Route path="/favorites" component={FavoriteMedia} />
      {/* <Route path="/:path" component={PageNotFound} /> */}
      {/*       </Switch>
    );
  }

  if (!SESSION) {
    return (
        <Switch> */}
      {/* <Route path="/" component={Home} /> */}
      <Route path="/login" component={UserLogIn} />
      {/* <Route path="/registration" component={UserRegistration} /> */}
      {/* <Route path="/media-details" component={MediaDetails} /> */}
      {/* <Route path="/reset-password" component={ResetPassword} /> */}
      <Route path="/:path" component={PageNotFound} />
    </Switch>
  );
  // }
}

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<App />);
