import { lazy } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "wouter";
import HandleLoading from "~/components/HandleLoading";
// import FilmDetails from "~/components/FilmDetails";
// import PersonDetails from "~/components/PersonDetails";
// import SerieDetails from "~/components/SerieDetails";
import "~/utils/styles/Details.scss";
import Header from "../components/Header";

const FilmDetails = lazy(() => import("~/components/FilmDetails"));
const PersonDetails = lazy(() => import("~/components/PersonDetails"));
const SerieDetails = lazy(() => import("~/components/SerieDetails"));

scrollTo(0, 0);

export default function Details() {
  const [, navigation] = useLocation();
  const filmData = useSelector((e) => e.media.filmDetails);
  const personData = useSelector((e) => e.media.personDetails);
  const serieData = useSelector((e) => e.media.serieDetails);
  const typeMedia = useSelector((e) => e.media.typeMedia);

  let mountComponent = null;

  if (typeMedia === "tv") mountComponent = <HandleLoading data={serieData} Component={SerieDetails} />;
  if (typeMedia === "movie") mountComponent = <HandleLoading data={filmData} Component={FilmDetails} />;
  if (typeMedia === "person") mountComponent = <HandleLoading data={personData} Component={PersonDetails} />;

  return (
    <div className="Details">
      <Header>
        <button onClick={() => navigation("/")}>Volver</button>
      </Header>

      {mountComponent}
    </div>
  );
}
