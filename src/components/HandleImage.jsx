import Parameters from "../services/Parameters";
import imageNotFound from "../assets/clipart15852.png";
import { useLocation } from "wouter";
import { FilmDetails } from "../actions/FilmActions";

const TMDb = Parameters.TMDb;

const HandleImage = ({ data }) => {
  const { poster_path, backdrop_path, img_required } = data;
  const [loca, setLocation] = useLocation();

  const HandleDetails = (myData) => {
    FilmDetails(myData);
    setLocation(`${location.origin}${loca}/details`);
  };

  const MyImage = () => {
    switch (img_required) {
      case "poster":
        if (poster_path) return `${TMDb.img}${poster_path}`;
      case "backdrop":
        if (backdrop_path) return `${TMDb.img}${backdrop_path}`;

      default:
        return imageNotFound;
    }
  };

  return (
    <img src={MyImage()} onClick={() => HandleDetails(data)} loading="lazy" />
  );
};

export default HandleImage;
