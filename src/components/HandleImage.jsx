import Parameters from "../services/Parameters";
import imageNotFound from "../assets/clipart15852.png";
import { useLocation } from "wouter";
import {
  FilmDetails,
  MediaType,
  PersonDetails,
  SerieDetails,
} from "../redux/actions/FilmActions";

const TMDb = Parameters.TMDb;

export default function HandleImage({ data, img_required, is_person }) {
  const [, navigate] = useLocation();
  const { poster_path, backdrop_path, profile_path, media_type } = data;

  const HandleDetails = () => {
    MediaType(media_type);

    switch (media_type) {
      case "tv":
        SerieDetails(data);
        break;

      case "movie":
        FilmDetails(data);
        break;

      case "person":
        PersonDetails(data);
        break;
    }

    navigate("/details");
  };

  const MyImage = () => {
    switch (img_required) {
      case "poster":
        if (poster_path) return `${TMDb.img}w400${poster_path}`;
      case "backdrop":
        if (backdrop_path) {
          return `${TMDb.img}original${backdrop_path}`;
        } else if (poster_path) {
          return `${TMDb.img}original${poster_path}`;
        }
      case "profile":
        if (profile_path) return `${TMDb.img}w400${profile_path}`;

      default:
        return imageNotFound;
    }
  };

  return (
    <img
      src={MyImage()}
      onClick={() => HandleDetails()}
      loading="lazy"
      style={is_person ? { objectFit: "contain" } : null}
    />
  );
}
