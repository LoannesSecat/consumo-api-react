import Photo from "~/assets/icons/Photo";
import Parameters from "~/utils/Parameters";

const { TMDb } = Parameters;

export default function HandleImage({
  url, size, toShow, className,
}) {
  let mySrc = "";

  if (toShow === "poster&profile" && (url.poster_path || url.profile_path)) {
    const { poster_path, profile_path } = url;

    if (
      (poster_path || profile_path) !== undefined
      || (poster_path && profile_path) !== undefined
    ) {
      mySrc = `${TMDb.url_img}${size}${profile_path ?? poster_path}`;
    }
  }

  if (toShow === "backdrop" && url.backdrop_path) {
    const { backdrop_path } = url;
    mySrc = `${TMDb.url_img}${size}${backdrop_path}`;
  }

  if (toShow === "profile" && url.profile_path) {
    const { profile_path } = url;
    mySrc = `${TMDb.url_img}${size}${profile_path}`;
  }

  if (mySrc) {
    return (
      <img
        className={className || null}
        src={mySrc}
        loading="lazy"
        alt="Imagen"
      />
    );
  }

  return <Photo />;
}
