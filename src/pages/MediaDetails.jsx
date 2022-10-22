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

  const cases = {
    tv: {
      data: SERIE_DATA,
      toRender: SerieDetails,
    },
    movie: {
      data: FILM_DATA,
      toRender: FilmDetails,
    },
    person: {
      data: PERSON_DATA,
      toRender: PersonDetails,
    },
  };

  return (
    <>
      <Header>
        <GoBackButton />
      </Header>

      <section className="media-details">
        <HandleLoading
          data={cases[TYPE_MEDIA].data}
          Component={cases[TYPE_MEDIA].toRender}
        />
      </section>
    </>
  );
}
