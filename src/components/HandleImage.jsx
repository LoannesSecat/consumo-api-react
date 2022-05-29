import Parameters from "../services/Parameters";
import imageNotFound from "../../assets/clipart15852.png";
import { useLocation } from "wouter";
import { FilmDetails } from "../redux/actions/FilmActions";

const TMDb = Parameters.TMDb;

export default function HandleImage({ data }) {
  const { poster_path, backdrop_path, img_required } = data;
  const [, navigate] = useLocation();

  const HandleDetails = (myData) => {
    FilmDetails(myData);
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

      default:
        return imageNotFound;
    }
  };

  return (
    <img src={MyImage()} onClick={() => HandleDetails(data)} loading="lazy" />
  );
}
