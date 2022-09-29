import { Link } from "react-router-dom";
import Heart from "~/assets/icons/Heart";
import Sparkles from "~/assets/icons/Sparkles";
import UserGroup from "~/assets/icons/UserGroup";
import {
  FilmDetails, MediaType, PersonDetails, SerieDetails,
} from "~/redux/actions/MediaActions";
import "~/utils/styles/CardMedia.scss";
import HandleImage from "../HandleImage";

export default function CardMedia({ data }) {
  const {
    profile_path, poster_path, title, name, media_type, popularity, vote_average, vote_count,
  } = data;
  let mediaType = null;

  if (media_type === "movie") mediaType = "Película";
  if (media_type === "tv") mediaType = "Serie";

  const MountDetails = () => {
    MediaType(media_type);

    if (media_type === "movie") FilmDetails(data);
    if (media_type === "tv") SerieDetails(data);
    if (media_type === "person") PersonDetails(data);
  };

  return (
    <section className="card-media">
      <Link to="media-details" onMouseDown={() => MountDetails()} onTouchStart={() => MountDetails()}>
        <HandleImage
          url={{
            profile_path,
            poster_path,
          }}
          size="w400"
          toShow="poster&profile"
        />

        <article className="info">
          <h2>{title ?? name}</h2>

          <div className="statistics">
            {popularity
              ? (
                <article title="Popularidad">
                  <UserGroup />
                  <span>{popularity}</span>
                </article>
              )
              : null}

            {vote_average
              ? (
                <article title="Votación promedio">
                  <Sparkles />
                  <span>{vote_average}</span>
                </article>
              )
              : null}

            {vote_count
              ? (
                <article title="Me gusta">
                  <Heart />
                  <span>{vote_count}</span>
                </article>
              ) : null}
          </div>

          {mediaType ? <span className="media-type">{mediaType}</span> : null}
        </article>
      </Link>
    </section>
  );
}
