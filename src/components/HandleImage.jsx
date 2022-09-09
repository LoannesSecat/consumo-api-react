import Photo from "~/assets/icons/Photo";
import Parameters from "~/utils/Parameters";

const { TMDb } = Parameters;

export default function HandleImage({ url, size, toShowOn }) {
  const {
    poster_path, profile_path, backdrop_path,
  } = url;
  let mySrc = "";

  if (toShowOn === "home" && (poster_path || profile_path)) {
    if (
      (poster_path || profile_path) !== undefined
      || (poster_path && profile_path) !== undefined
    ) {
      mySrc = `${TMDb.url_img}${size}${profile_path ?? poster_path}`;
    }
  }

  if (toShowOn === "details") {
    mySrc += `${size}${backdrop_path}`;
  }

  if (mySrc) {
    return (
      <img
        src={mySrc}
        loading="lazy"
        alt="Imagen"
      />
    );
  }

  return <Photo />;
}
