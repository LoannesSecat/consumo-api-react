import { Route, Routes, useLocation } from "react-router-dom";
import Home from "~/pages/Home";
import MediaDetails from "~/pages/MediaDetails";
import PageNotFound from "~/pages/PageNotFound";
import UserLogIn from "~/pages/UserLogIn";
import UserRegistration from "~/pages/UserRegistration";

export default function RouterProvider() {
  const { pathname } = useLocation();

  const RelativePath = (screen) => {
    const ARR = pathname.split("/");

    if (ARR[ARR.length - 1] === screen) {
      return pathname;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={RelativePath("login")} element={<UserLogIn />} />
      <Route path={RelativePath("registration")} element={<UserRegistration />} />
      <Route path={RelativePath("media-details")} element={<MediaDetails />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
