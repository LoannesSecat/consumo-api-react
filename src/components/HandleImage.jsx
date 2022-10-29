import photo from "~/assets/icons/photo.svg";
import Parameters from "~/utils/Parameters";

const { TMDb } = Parameters;

export default function HandleImage({
  url, size, className, loading,
}) {
  const URL = url ? `${TMDb.url_img}${size}${url}` : photo;
  const CLASSNAME = url ? className : "no-found";

  return (
    <img
      className={CLASSNAME}
      src={URL}
      loading={loading || "eager"}
      alt="Imagen"
    />
  );
}
