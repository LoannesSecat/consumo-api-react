import { useSelector } from "react-redux";
import {
  Navigate,
  Route, Routes, useLocation,
} from "react-router-dom";
import Home from "~/pages/Home";
import MediaDetails from "~/pages/MediaDetails";
import PageNotFound from "~/pages/PageNotFound";
import ResetPassword from "~/pages/ResetPassword";
import UserLogIn from "~/pages/UserLogIn";
import UserRegistration from "~/pages/UserRegistration";
import UserSettings from "~/pages/UserSettings";

const auxRedirect = <Navigate to="/" />;

export default function PagesProvider() {
  const { pathname } = useLocation();
  const IS_LOGGED = useSelector((e) => e.user.SESSION);

  const RelativePath = (screen) => {
    const RUTES = pathname.split("/");

    if (RUTES[RUTES.length - 1] === screen) {
      return pathname;
    }
  };

  const RedirectOfRestriction = (element) => {
    if (IS_LOGGED) {
      if ((localStorage.getItem("EVENT") && element.type === ResetPassword)
      || element.type === UserSettings) {
        return element;
      }
    }

    if (!IS_LOGGED && (element.type === UserLogIn
      || element.type === UserRegistration
      || element.type === ResetPassword)
    ) {
      return element;
    }

    return auxRedirect;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={RelativePath("login")} element={RedirectOfRestriction(<UserLogIn />)} />
      <Route path={RelativePath("registration")} element={RedirectOfRestriction(<UserRegistration />)} />
      <Route path={RelativePath("media-details")} element={<MediaDetails />} />
      <Route path={RelativePath("reset-password")} element={RedirectOfRestriction(<ResetPassword />)} />
      <Route path={RelativePath("settings")} element={RedirectOfRestriction(<UserSettings />)} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
