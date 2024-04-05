import { useEffect, useState } from "react";
import Image from "~/components/Image";
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
          className={`${styles.input_search} input-search`}
          onChange={HandleInputChange}
        />
      </Header>

      {
        auxData.length
          ? (
            <section className={styles.favorites_media}>
              {
                auxData.map((elm) => {
                  let {
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

                  let imgPath = photoSVG;

                  if (profile_path) {
                    imgPath = `${url_img}/w185${profile_path}`;
                  }

                  if (backdrop_path) {
                    imgPath = `${url_img}/w300${backdrop_path}`;
                  }

                  return (
                    <article key={id} className={styles.card}>
                      <Image
                        data-src={imgPath}
                        className={styles.media_image}
                        alt={`Imagen de: ${title}`}
                        height={(media_type === "person" || !media_type) ? "278" : "142"}
                        width="auto"
                      />

                      <hgroup className={styles.title_group}>
                        <div>
                          <h1 className={styles.media_title}>{title ?? name}</h1>
                          <SaveFavoriteButton dataToSave={elm} className={styles.save_favorite_button} />
                        </div>

                        {
                          media_type?.length && <h2 className={styles.type}>{mediaTranslations[media_type]}</h2>
                        }
                      </hgroup>

                      {
                        mediaTranslations[known_for_department] && (
                          <p className={styles.known}>
                            Conocido por el campo de la {mediaTranslations[known_for_department]}
                          </p>
                        )
                      }

                      {
                        overview?.length && <p className={styles.overview}>{overview}</p>
                      }

                      <div className={styles.statistics}>
                        {
                          popularity && (
                            <div title="Popularidad" className={styles.popularity}>
                              <UserGroup />
                              <span>{popularity}</span>
                            </div>
                          )
                        }

                        {
                          vote_average && (
                            <div title="Votación promedio" className={styles.vote_average}>
                              <Sparkles />
                              <span>{vote_average}</span>
                            </div>
                          )
                        }

                        {
                          vote_count && (
                            <div title="Me gusta" className={styles.vote_count}>
                              <Heart />
                              <span>{vote_count}</span>
                            </div>
                          )
                        }
                      </div>
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
