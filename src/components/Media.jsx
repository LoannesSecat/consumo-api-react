import { useSelector } from "react-redux";
import "~/utils/styles/Media.scss";
import Empty from "./Empty";
import CardMedia from "./subcomponents/CardMedia";

export default function Media() {
  const RESOURCES = useSelector((e) => e.media.RESOURCES);

  if (Object.keys(RESOURCES).length) {
    return (
      <main className="media">
        {
          Object.values(RESOURCES)?.map((element) => (
            <CardMedia
              key={element.id}
              data={element}
            />
          ))
        }
      </main>
    );
  }

  return <Empty />;
}
