import "~/utils/styles/CardMedia.scss";
import HandleImage from "./HandleImage";
import Paragraph from "./subcomponents/Paragraph";

export default function CardMedia({ data }) {
  const handleMediaType = (type) => {
    switch (type) {
      case "movie":
        return <span>Película</span>;
      case "tv":
        return <span>Serie</span>;

      default:
        return null;
    }
  };

  return (
    <div className="CardMedia">
      <HandleImage
        data={data}
        img_required={data.media_type === "person" ? "profile" : "poster"}
      />

      <div className="info">
        <h2>{data.title ? data.title : data.name}</h2>
        <Paragraph param={data.overview ? data.overview : data.biography} />

        {handleMediaType(data?.media_type)}
      </div>
    </div>
  );
}
