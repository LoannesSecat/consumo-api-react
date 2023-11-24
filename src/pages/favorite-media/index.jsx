import { useEffect, useState } from "react";
import Empty from "~/components/empty";
import GoBackButton from "~/components/go-back-button";
import Header from "~/components/header";
import SaveFavoriteButton from "~/components/save-favorite-button";
import Heart from "~/icons/heart.svg?react";
import photoSVG from "~/icons/photo.svg";
import Sparkles from "~/icons/sparkles.svg?react";
import UserGroup from "~/icons/user-group.svg?react";
import store from "~/store";
import { TMDB, mediaTranslations } from "~/utils/constants.js";
import styles from "./user-favorites.module.scss";

const { url_img } = TMDB;

export default function FavoriteMedia() {
  const { favoriteMedia } = store.user();
  const [auxData, setAuxData] = useState(favoriteMedia);

  const HandleInputChange = (evt) => {
    const text = evt.target.value.trim();
    const inputTextValue = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .normalize();

    const newFavoriteMedia = favoriteMedia.filter(({ title, name }) => {
      const titleValue = (title ?? name)
        .toLowerCase()
        .normalize("NFD")
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();

      return titleValue.includes(inputTextValue);
    });

    setAuxData(newFavoriteMedia);
  };

  useEffect(() => {
    setAuxData(favoriteMedia);
    scroll(0, 0);
  }, [favoriteMedia]);

  return (
    <main className={styles.user_favorites}>
      <Header className={styles.header}>
        <GoBackButton />

        <input
          type="search"
          className={styles.input_search}
          onChange={HandleInputChange}
        />
      </Header>

      {
        auxData.length
          ? (
            <section className={styles.favorites_media}>
              {
                auxData.map((elm) => {
                  const {
                    vote_average,
                    media_type,
                    profile_path,
                    known_for_department,
                    popularity,
                    backdrop_path,
                    title,
                    overview,
                    vote_count,
                    id,
                    name,
                  } = elm;

                  const newClassName = [
                    styles.card,
                    styles[elm.media_type]
                  ].join(" ")

                  return (
                    <article key={id} className={newClassName}>
                      <SaveFavoriteButton dataToSave={elm} className={styles.save_favorite_button} />

                      {
                        media_type === "person"
                          ? (
                            <>
                              <img
                                src={profile_path ? `${url_img}/w400${profile_path}` : photoSVG}
                                className={styles.img_person}
                                alt={`Imagen de: ${title}`}
                              />

                              <h3 className={styles.name}>{title}</h3>

                              {
                                mediaTranslations[known_for_department] && (
                                  <span className={styles.known}>
                                    Conocido por el campo de la {mediaTranslations[known_for_department]}
                                  </span>
                                )
                              }

                              <div className={styles.popularity} title="Popularidad">
                                <UserGroup />
                                {popularity}
                              </div>
                            </>
                          )
                          : (
                            <>
                              <img
                                src={backdrop_path ? `${url_img}/w780${backdrop_path}` : photoSVG}
                                className={styles[`img_${elm.media_type}`]}
                                alt={`Imagen de: ${title}`}
                              />

                              <div>
                                <h3 className={styles.title}>{title ?? name}</h3>
                                <small className={styles.media_type}>
                                  {mediaTranslations[media_type]}
                                </small>
                              </div>

                              {
                                overview?.length
                                  ? <p className={styles.overview}>{overview}</p>
                                  : null
                              }

                              <div className={styles.statistics}>
                                {popularity
                                  ? (
                                    <div title="Popularidad" className={styles.popularity}>
                                      <UserGroup />
                                      <span>{popularity}</span>
                                    </div>
                                  )
                                  : null}

                                {vote_average
                                  ? (
                                    <div title="Votación promedio" className={styles.vote_average}>
                                      <Sparkles />
                                      <span>{vote_average}</span>
                                    </div>
                                  )
                                  : null}

                                {vote_count
                                  ? (
                                    <div title="Me gusta" className={styles.vote_count}>
                                      <Heart />
                                      <span>{vote_count}</span>
                                    </div>
                                  )
                                  : null}
                              </div>
                            </>
                          )
                      }
                    </article>
                  );
                })
              }
            </section>
          )
          : (<Empty />)
      }
    </main>
  );
}
