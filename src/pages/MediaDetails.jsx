import { useSuperState } from "@superstate/react";
import FilmDetails from "~/components/FilmDetails";
import PersonDetails from "~/components/PersonDetails";
import SerieDetails from "~/components/SerieDetails";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import SaveFavoriteButton from "~/components/subcomponents/SaveFavoriteButton";
import MediaC from "~/superstate/Media";
import styles from "~/utils/styles/media-details.module.scss";
import Header from "../components/Header";

export default function MediaDetails() {
  scrollTo(0, 0);
  useSuperState(MediaC.state);

  const {
    FILM_DETAILS,
    PERSON_DETAILS,
    SERIE_DETAILS,
    MEDIA_TYPE,
  } = MediaC.state.now();

  const CASES = {
    tv: {
      render: <SerieDetails data={SERIE_DETAILS} />,
      data: SERIE_DETAILS,
    },
    movie: {
      render: <FilmDetails data={FILM_DETAILS} />,
      data: FILM_DETAILS,
    },
    person: {
      render: <PersonDetails data={PERSON_DETAILS} />,
      data: PERSON_DETAILS,
    },
  };

  return (
    <>
      <Header className={styles.header}>
        <GoBackButton />
      </Header>

      <section className={styles.media_details}>
        <SaveFavoriteButton
          mediaData={CASES[MEDIA_TYPE].data}
          className={styles.save_favorite_button}
        />

        {CASES[MEDIA_TYPE].render}
      </section>
    </>
  );
}
