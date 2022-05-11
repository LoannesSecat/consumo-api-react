import Parameters from "../services/Parameters";
import imageNotFound from "../assets/clipart15852.png";

const TMDb = Parameters.TMDb;

const HandleImage = (poster, backdrop) => {
  if (poster != null) {
    return `${TMDb.img}${poster}`;
  }

  if (backdrop != null) {
    return `${TMDb.img}${backdrop}`;
  }

  return imageNotFound;
};

export default HandleImage;
