import { useEffect, useState } from "react";
import { ReactComponent as Heart } from "~/assets/icons/heart.svg";
import { ReactComponent as Sparkles } from "~/assets/icons/sparkles.svg";
import { ReactComponent as UserGroup } from "~/assets/icons/user-group.svg";
import Empty from "~/components/Empty";
import HandleImage from "~/components/HandleImage";
import Header from "~/components/Header";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import SaveFavoriteButton from "~/components/subcomponents/SaveFavoriteButton";
import store from "~/store";
import styles from "~/utils/styles/user-favorites.module.scss";
import Translations from "~/utils/Translations.json";

export default function UserFavorites() {
  const { FAVORITES } = store.user();
  const [filterData, setFilterData] = useState(FAVORITES);

  const KnownFor = (value) => {
    if (value && Translations.knownForDepartment[value]) {
      return Translations.knownForDepartment[value].toLowerCase();
    }

    return value;
  };

  const HandleOnChange = (evt) => {
    const TEXT = evt.target.value.trim();
    const DATA = Object.values(FAVORITES).filter((elm) => {
      const TITLE = elm.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();
      const INPUT_TEXT = TEXT
        .toLowerCase()
        .normalize("NFD")
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();

      return TITLE.includes(INPUT_TEXT);
    });

    setFilterData(DATA);
  };

  useEffect(() => {
    setFilterData(FAVORITES);
  }, [FAVORITES]);

  return (
    <main className={styles.user_favorites}>
      <Header className={styles.header}>
        <GoBackButton />

        <input
          type="search"
          className={styles.input_search}
          onChange={HandleOnChange}
        />
      </Header>

      {
        filterData.length
          ? (
            <section className={styles.favorites_media}>
              {
                Object.values(filterData).map((elm) => {
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
                  } = elm;

                  return (
                    <article key={id} className={`${styles.card} ${styles[elm.media_type]}`}>
                      <SaveFavoriteButton mediaData={elm} className={styles.save_favorite_button} />

                      {
                        media_type === "person"
                          ? (
                            <>
                              <HandleImage
                                size="w400"
                                url={profile_path}
                                className={{
                                  style: styles.img_person,
                                  not_found: styles.img_not_found,
                                }}
                                alt={`Imagen de: ${title}`}
                              />

                              <h3 className={styles.name}>{title}</h3>

                              <span className={styles.known}>
                                Conocido por el campo de la
                                {" "}
                                {KnownFor(known_for_department)}
                              </span>

                              <div className={styles.popularity} title="Popularidad">
                                <UserGroup />
                                {popularity}
                              </div>
                            </>
                          )
                          : (
                            <>
                              <HandleImage
                                className={{
                                  style: styles[`img_${elm.media_type}`],
                                  not_found: styles.img_not_found,
                                }}
                                url={backdrop_path}
                                size="w780"
                                alt={`Imagen de ${title}`}
                              />

                              <div>
                                <h3 className={styles.title}>{title}</h3>
                                <small className={styles.media_type}>
                                  {Translations.MediaType[media_type]}
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
