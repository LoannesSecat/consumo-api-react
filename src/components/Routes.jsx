import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import Home from "~/pages/Home";
import PageNotFound from "~/pages/PageNotFound";
import ResetPassword from "~/pages/ResetPassword";
import UserLogIn from "~/pages/UserLogIn";
import UserRegistration from "~/pages/UserRegistration";
import UserSettings from "~/pages/UserSettings";
import FavoriteMedia from "~/pages/favorite-media";
import MediaDetails from "~/pages/media-details";
import store from "~/store";

export default function Routes() {
  const { session, isSessionActive } = store.user()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await isSessionActive());
    })();
  }, [session]);

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/media-details" component={MediaDetails} />
        <Route path="/settings" component={UserSettings} />
        <Route path="/favorites" component={FavoriteMedia} />
        <Route path="/:path" component={PageNotFound} />
      </Switch>
    );
  }

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={UserLogIn} />
        <Route path="/registration" component={UserRegistration} />
        <Route path="/media-details" component={MediaDetails} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/:path" component={PageNotFound} />
      </Switch>
    );
  }
}