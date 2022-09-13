import { useSelector } from "react-redux";
import "~/utils/styles/Media.scss";
import CardMedia from "./subcomponents/CardMedia";

export default function Media() {
  const resources = useSelector((e) => e.media.resources);

  return (
    <div className="Media">
      {
        Object.values(resources).map((element) => (
          <CardMedia
            key={element.id}
            data={element}
          />
        ))
      }
    </div>
  );
}
