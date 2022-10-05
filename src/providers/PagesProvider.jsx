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

const auxRedirect = <Navigate to="/" />;

export default function PagesProvider() {
  const { pathname } = useLocation();
  const IS_LOGGED = useSelector((e) => e.user.session);

  const RelativePath = (screen) => {
    const ARR = pathname.split("/");

    if (ARR[ARR.length - 1] === screen) {
      return pathname;
    }
  };

  const RedirectOfRestriction = (element) => {
    if (IS_LOGGED) {
      if (localStorage.getItem("EVENT") && element.type === ResetPassword) {
        return element;
      }

      return auxRedirect;
    }

    return element;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={RelativePath("login")} element={RedirectOfRestriction(<UserLogIn />)} />
      <Route path={RelativePath("registration")} element={RedirectOfRestriction(<UserRegistration />)} />
      <Route path={RelativePath("media-details")} element={<MediaDetails />} />
      <Route path={RelativePath("reset-password")} element={RedirectOfRestriction(<ResetPassword />)} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
