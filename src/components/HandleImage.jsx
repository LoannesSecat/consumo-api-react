import Parameters from "@/services/Parameters";
import imageNotFound from "@/assets/clipart15852.png";
import { useLocation } from "wouter";
import { FilmDetails } from "@/actions/FilmActions";

const TMDb = Parameters.TMDb;

const HandleImage = ({ data }) => {
  const { id, media_type, poster, backdrop } = data;
  const [loca, setLocation] = useLocation();

  const HandleDetails = (media_type, id) => {
    FilmDetails({ media_type: media_type, id: id });
    setLocation(`${location.origin}${loca}/details`);
  };

  const MyImage = () => {
    if (poster != (null || undefined)) {
      return `${TMDb.img}${poster}`;
    }

    if (backdrop != (null || undefined)) {
      return `${TMDb.img}${backdrop}`;
    }

    return imageNotFound;
  };

  return (
    <img
      src={MyImage()}
      onClick={() => HandleDetails(media_type, id)}
      loading="eager"
    />
  );
};

export default HandleImage;
