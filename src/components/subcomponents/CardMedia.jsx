import { Link } from "react-router-dom";
import { ReactComponent as Heart } from "~/assets/icons/heart.svg";
import { ReactComponent as Sparkles } from "~/assets/icons/sparkles.svg";
import { ReactComponent as UserGroup } from "~/assets/icons/user-group.svg";
import {
  FilmDetails, MediaType, PersonDetails, SerieDetails,
} from "~/services/MediaServices";
import "~/utils/styles/CardMedia.scss";
import HandleImage from "../HandleImage";

const MEDIA_TYPE_TEXT = {
  movie: "Película",
  tv: "Serie",
};

const AuxMount = (comingData, type) => {
  const CASES = {
    movie: FilmDetails(comingData),
    tv: SerieDetails(comingData),
    person: PersonDetails(comingData),
  };

  return CASES[type];
};

export default function CardMedia({ data }) {
  const {
    profile_path, poster_path, title, name, media_type, popularity, vote_average, vote_count,
  } = data;

  const MountDetails = () => {
    MediaType(media_type);
    AuxMount(data, media_type);
  };

  return (
    <article className="card-media">
      <Link to="media-details" onMouseDown={() => MountDetails()} onTouchStart={() => MountDetails()}>
        <HandleImage
          url={{
            profile_path,
            poster_path,
          }}
          size="w400"
          toShow="poster&profile"
          className="poster-img"
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
          MEDIA_TYPE_TEXT[media_type]
            ? <span className="media-type">{MEDIA_TYPE_TEXT[media_type]}</span>
            : null
          }
        </footer>
      </Link>
    </article>
  );
}
