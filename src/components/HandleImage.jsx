import Parameters from "@/services/Parameters";
import imageNotFound from "@/assets/clipart15852.png";
import { useLocation } from "wouter";
import { FilmDetails } from "@/actions/FilmActions";

const TMDb = Parameters.TMDb;

const HandleImage = ({ data }) => {
  const { id, media_type, poster, backdrop, img_required } = data;
  const [loca, setLocation] = useLocation();

  const HandleDetails = (myData) => {
    FilmDetails(myData);
    setLocation(`${location.origin}${loca}/details`);
  };

  const MyImage = () => {
    switch (img_required) {
      case "poster":
        if (poster) return `${TMDb.img}${poster}`;
      case "backdrop":
        if (backdrop) return `${TMDb.img}${backdrop}`;

      default:
        return imageNotFound;
    }
  };

  return (
    <img src={MyImage()} onClick={() => HandleDetails(data)} loading="eager" />
  );
};

export default HandleImage;
