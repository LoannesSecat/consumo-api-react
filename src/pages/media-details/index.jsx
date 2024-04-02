import { useEffect } from "react";
import GoBackButton from "~/components/go-back-button";
import Loading from "~/components/loading";
import SaveFavoriteButton from "~/components/save-favorite-button";
import photoSVG from '~/icons/photo.svg';
import { readMediaDetails } from "~/services/media-services";
import store from "~/store";
import { TMDB } from "~/utils/constants";
import Header from "../../components/header";
import FilmDetails from "./film-details";
import styles from "./media-details.module.scss";
import PersonDetails from "./person-details";
import SerieDetails from "./serie-details";

const { url_img } = TMDB;

export default function MediaDetails() {
  const { details, mediaSelectedType, auxMediaDetails, isLoading, isDone } = store.media();
  const { profile_path, backdrop_path } = details;

  let backdrop_url = (mediaSelectedType === "person")
    ? `${url_img}/h632${profile_path}`
    : `${url_img}/w1280${backdrop_path}`;

  if (backdrop_url.includes("undefined")) {
    backdrop_url = photoSVG;
  }

  Object.assign(details, { backdrop_url });

  useEffect(() => {
    scrollTo(0, 0);
    readMediaDetails(auxMediaDetails);
  }, [])

  return (
    <main className={styles.media_details_container}>
      <Header className={styles.header}>
        <GoBackButton />
      </Header>

      {
        isLoading && !isDone && (
          <Loading />
        )
      }

      {
        !isLoading && isDone && (
          <section className={styles.media_details}>
            <SaveFavoriteButton dataToSave={details} className={styles.save_favorite_button} />

            {mediaSelectedType === "tv" && (<SerieDetails data={details} />)}
            {mediaSelectedType === "movie" && (<FilmDetails data={details} />)}
            {mediaSelectedType === "person" && (<PersonDetails data={details} />)}
          </section>
        )
      }
    </main>
  );
}
