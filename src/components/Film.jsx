import { MyDate } from "../utils/Converter";
import "../utils/styles/Film.scss";
import HandleImage from "./HandleImage";
import Paragraph from "./subcomponents/Paragraph";

export default function Film({ data }) {
  const MediaType = (type) => {
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
    <div className="Film">
      <HandleImage
        data={data}
        img_required={data.media_type === "person" ? "profile" : "poster"}
      />

      <div className="info">
        <h2>{data.title ? data.title : data.name}</h2>
        <Paragraph param={data.overview ? data.overview : data.biography} />

        {MediaType(data?.media_type)}
      </div>
    </div>
  );
}
