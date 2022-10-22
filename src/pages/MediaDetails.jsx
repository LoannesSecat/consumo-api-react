import { lazy } from "react";
import { useSelector } from "react-redux";
import HandleLoading from "~/components/HandleLoading";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import "~/utils/styles/MediaDetails.scss";
import Header from "../components/Header";

const FilmDetails = lazy(() => import("~/components/FilmDetails"));
const PersonDetails = lazy(() => import("~/components/PersonDetails"));
const SerieDetails = lazy(() => import("~/components/SerieDetails"));

scrollTo(0, 0);

export default function MediaDetails() {
  const {
    FILM_DETAILS, PERSON_DETAILS, SERIE_DETAILS, TYPE_MEDIA,
  } = useSelector((e) => e.media);

  const CASES = {
    tv: {
      data: SERIE_DETAILS,
      toRender: SerieDetails,
    },
    movie: {
      data: FILM_DETAILS,
      toRender: FilmDetails,
    },
    person: {
      data: PERSON_DETAILS,
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
          data={CASES[TYPE_MEDIA].data}
          Component={CASES[TYPE_MEDIA].toRender}
        />
      </section>
    </>
  );
}
