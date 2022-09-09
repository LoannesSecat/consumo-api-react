import { Link } from "wouter";
import Heart from "~/assets/icons/Heart";
import Sparkles from "~/assets/icons/Sparkles";
import UserGroup from "~/assets/icons/UserGroup";
import {
  FilmDetails, MediaType, PersonDetails, SerieDetails,
} from "~/redux/actions/MediaActions";
import "~/utils/styles/CardMedia.scss";
import HandleImage from "./HandleImage";

export default function CardMedia({ data }) {
  const {
    profile_path, poster_path, title, name, media_type, popularity, vote_average, vote_count,
  } = data;
  let mediaType = null;

  const MountDetails = (event) => {
    if (event.type === "click" || event.type === "contextmenu") {
      if (media_type === "movie") FilmDetails(data);
      if (media_type === "tv") SerieDetails(data);
      if (media_type === "person") PersonDetails(data);

      MediaType(media_type);
    }
  };

  if (media_type === "movie") mediaType = "Película";
  if (media_type === "tv") mediaType = "Serie";

  return (
    <div className="CardMedia">
      <Link href="/details" onClick={(e) => MountDetails(e)} onContextMenu={(e) => MountDetails(e)}>
        <HandleImage
          url={{
            profile_path,
            poster_path,
          }}
          size="w400"
          toShowOn="home"
        />

        <div className="info">
          <h2>{title ?? name}</h2>

          <div className="statistics">
            {popularity
              ? (
                <div>
                  <UserGroup />
                  <span>{popularity}</span>
                </div>
              )
              : null}

            {vote_average
              ? (
                <div>
                  <Sparkles />
                  <span>{vote_average}</span>
                </div>
              )
              : null}

            {vote_count
              ? (
                <div>
                  <Heart />
                  <span>{vote_count}</span>
                </div>
              ) : null}
          </div>

          {mediaType ? <span className="media-type">{mediaType}</span> : null}
        </div>
      </Link>
    </div>
  );
}
