import { Link } from "wouter";
import { ReactComponent as Heart } from "~/assets/icons/heart.svg";
import { ReactComponent as Sparkles } from "~/assets/icons/sparkles.svg";
import { ReactComponent as UserGroup } from "~/assets/icons/user-group.svg";
import MediaC from "~/superstate/Media";
import styles from "~/utils/styles/card-media.module.scss";
import Translations from "~/utils/Translations.json";
import HandleImage from "../HandleImage";
import SaveFavoriteButton from "./SaveFavoriteButton";

const { mediaDetails, mediaType } = MediaC;

export default function CardMedia({ data }) {
  const {
    profile_path, poster_path, title, name, media_type, popularity, vote_average, vote_count,
  } = data;

  const MountDetails = () => {
    mediaType(media_type);
    mediaDetails(data, media_type);
  };

  return (
    <article className={styles.card_media}>
      <SaveFavoriteButton mediaData={data} />

      <Link
        href="media-details"
        onMouseDown={() => MountDetails()}
        onTouchStart={() => MountDetails()}
      >
        <HandleImage
          url={poster_path ?? profile_path}
          size="w400"
          className={{
            style: styles.poster_img,
            not_found: styles.img_not_found,
          }}
          alt={`Poster de ${title ?? name}`}
        />

        <footer className={styles.info}>
          <h2>{title ?? name}</h2>

          <div className={styles.statistics}>
            {popularity
              ? (
                <div title="Popularidad" className={styles.popularity}>
                  <UserGroup className={styles.user_groupSVG} />
                  <span>{popularity}</span>
                </div>
              )
              : null}

            {vote_average
              ? (
                <div title="Votación promedio" className={styles.vote_average}>
                  <Sparkles className={styles.starSVG} />
                  <span>{vote_average}</span>
                </div>
              )
              : null}

            {vote_count
              ? (
                <div title="Me gusta" className={styles.vote_count}>
                  <Heart className={styles.heartSVG} />
                  <span>{vote_count}</span>
                </div>
              ) : null}
          </div>

          {
            Translations.MediaType[media_type]
              ? <span className={styles.media_type}>{Translations.MediaType[media_type]}</span>
              : null
          }
        </footer>
      </Link>
    </article>
  );
}
