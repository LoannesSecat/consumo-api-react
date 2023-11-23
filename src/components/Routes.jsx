import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import Home from "~/pages/Home";
import FavoriteMedia from "~/pages/favorite-media";
import UserLogIn from "~/pages/log-in";
import MediaDetails from "~/pages/media-details";
import PageNotFound from "~/pages/page-not-found";
import ResetPassword from "~/pages/reset-password";
import UserSettings from "~/pages/settings";
import UserRegistration from "~/pages/sign-up";
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
        <Route path="/signup" component={UserRegistration} />
        <Route path="/media-details" component={MediaDetails} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/:path" component={PageNotFound} />
      </Switch>
    );
  }
}