import { Link } from "react-router-dom";
import { ReactComponent as Heart } from "~/assets/icons/heart.svg";
import { ReactComponent as Sparkles } from "~/assets/icons/sparkles.svg";
import { ReactComponent as UserGroup } from "~/assets/icons/user-group.svg";
import {
  FilmDetails, MediaType, PersonDetails, SerieDetails,
} from "~/services/MediaServices";
import "~/utils/styles/CardMedia.scss";
import Translations from "~/utils/Translations.json";
import HandleImage from "../HandleImage";
import SaveFavoriteButton from "./SaveFavoriteButton";

export default function CardMedia({ data }) {
  const {
    profile_path, poster_path, title, name, media_type, popularity, vote_average, vote_count,
  } = data;

  const MountDetails = () => {
    MediaType(media_type);

    if (media_type === "movie")FilmDetails(data);
    if (media_type === "tv") SerieDetails(data);
    if (media_type === "person") PersonDetails(data);
  };

  return (
    <article className="card-media">
      <SaveFavoriteButton mediaData={data} />

      <Link to="media-details" onMouseDown={() => MountDetails()} onTouchStart={() => MountDetails()}>
        <HandleImage
          url={poster_path ?? profile_path}
          size="w400"
          className="poster-img"
          loading="lazy"
        />

        <footer className="info">
          <h2>{title ?? name}</h2>

          <div className="statistics">
            {popularity
              ? (
                <div title="Popularidad" className="popularity">
                  <UserGroup />
                  <span>{popularity}</span>
                </div>
              )
              : null}

            {vote_average
              ? (
                <div title="Votación promedio" className="vote-average">
                  <Sparkles />
                  <span>{vote_average}</span>
                </div>
              )
              : null}

            {vote_count
              ? (
                <div title="Me gusta" className="vote-count">
                  <Heart />
                  <span>{vote_count}</span>
                </div>
              ) : null}
          </div>

          {
          Translations.MediaType[media_type]
            ? <span className="media-type">{Translations.MediaType[media_type]}</span>
            : null
          }
        </footer>
      </Link>
    </article>
  );
}
