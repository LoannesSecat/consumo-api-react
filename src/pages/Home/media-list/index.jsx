import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ReactComponent as Heart } from "~/assets/icons/heart.svg";
import photoSVG from "~/assets/icons/photo.svg";
import { ReactComponent as Sparkles } from "~/assets/icons/sparkles.svg";
import { ReactComponent as UserGroup } from "~/assets/icons/user-group.svg";
import Empty from "~/components/Empty";
import SaveFavoriteButton from "~/components/save-favorite-button";
import store from "~/store";
import { TMDB, mediaTranslations } from "~/utils/constants.js";
import styles from "./media-list.module.scss";

const { url_img } = TMDB;

export default function MediaList() {
  const { data, page, readMedia, filterText, readMediaDetails } = store.media();
  const pageRef = useRef(page);
  const filterTextRef = useRef(filterText);

  // Intersection observer section ---
  const intersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          if (target.getAttribute("data-src")) {
            target.setAttribute("src", target.getAttribute("data-src"));
            target.removeAttribute("data-src");
          }

          observer.unobserve(target);
        }
      });
    },
    {
      root: null,
      rootMargin: "300px 0px",
      threshold: 0,
    },
  )

  useEffect(() => {
    const img = document.querySelectorAll(`.${styles.poster}`);

    img.forEach((elm) => {
      intersectionObserver.observe(elm);
    });
  }, [intersectionObserver]);
  // ---

  const handleMediaDetails = (values) => {
    readMediaDetails(values);
  }

  useEffect(() => {
    if (pageRef.current !== page || filterTextRef.current !== filterText) {
      readMedia();

      pageRef.current = page;
      filterTextRef.current = filterText;
    }
  }, [page, filterText]);

  if (data?.length) {
    return (
      <main className={styles.media}>
        {
          data.map((item) => {
            const { profile_path, poster_path, title, name, media_type, popularity, vote_average, vote_count, id } = item;
            const imageName = media_type.includes("profile") ? profile_path : poster_path;
            const url = `${url_img}/w400${imageName}`;
            const itemkey = `${id}-${(title ?? name).replaceAll(" ", "_")}`;

            return (
              <article className={styles.card_media} key={itemkey}>
                <SaveFavoriteButton dataToSave={item} className={styles.favorite_button} />

                <Link
                  href="media-details"
                  onMouseDown={() => handleMediaDetails(item)}
                  onTouchStart={() => handleMediaDetails(item)}
                >

                  <img
                    {...(
                      imageName
                        ? { "data-src": url }
                        : {
                          src: photoSVG,
                          style: { background: "rgb(0 0 0 / 5%)" }
                        }
                    )}
                    width="400"
                    height="600"
                    alt={`Poster de ${title ?? name}`}
                    className={styles.poster}
                  />

                  <footer className={styles.info}>
                    <h2>{title ?? name}</h2>

                    <div className={styles.statistics}>
                      {
                        popularity ?
                          (
                            <div title="Popularidad" className={styles.popularity}>
                              <UserGroup className={styles.user_groupSVG} />
                              <span>{popularity}</span>
                            </div>
                          )
                          : null
                      }

                      {
                        vote_average ?
                          (
                            <div title="Votación promedio" className={styles.vote_average}>
                              <Sparkles className={styles.starSVG} />
                              <span>{vote_average}</span>
                            </div>
                          )
                          : null
                      }

                      {
                        vote_count ?
                          (
                            <div title="Me gusta" className={styles.vote_count}>
                              <Heart className={styles.heartSVG} />
                              <span>{vote_count}</span>
                            </div>
                          )
                          : null
                      }
                    </div>

                    {
                      mediaTranslations[media_type]
                        ? <span className={styles.media_type}>{mediaTranslations[media_type]}</span>
                        : null
                    }
                  </footer>
                </Link>
              </article>
            )
          })
        }
      </main>
    );
  }

  return <Empty />;
}
