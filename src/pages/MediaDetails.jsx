import { lazy } from "react";
import { useSelector } from "react-redux";
import HandleLoading from "~/components/HandleLoading";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import "~/utils/styles/MediaDetails.scss";
import Header from "../components/Header";

const FilmDetails = lazy(() => import("~/components/FilmDetails"));
const PersonDetails = lazy(() => import("~/components/PersonDetails"));
const SerieDetails = lazy(() => import("~/components/SerieDetails"));

export default function MediaDetails() {
  scrollTo(0, 0);
  const FILM_DATA = useSelector((e) => e.media.filmDetails);
  const PERSON_DATA = useSelector((e) => e.media.personDetails);
  const SERIE_DATA = useSelector((e) => e.media.serieDetails);
  const TYPE_MEDIA = useSelector((e) => e.media.typeMedia);

  let mountComponent = null;

  if (TYPE_MEDIA === "tv") mountComponent = <HandleLoading data={SERIE_DATA} Component={SerieDetails} />;
  if (TYPE_MEDIA === "movie") mountComponent = <HandleLoading data={FILM_DATA} Component={FilmDetails} />;
  if (TYPE_MEDIA === "person") mountComponent = <HandleLoading data={PERSON_DATA} Component={PersonDetails} />;

  return (
    <div className="media-details">
      <Header>
        <GoBackButton />
      </Header>

      {mountComponent}
    </div>
  );
}
