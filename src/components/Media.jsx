import CardMedia from "./CardMedia";

export default function Media({ data }) {
  return (
    <div className="Media">
      {
        data.map((element) => (
          <CardMedia
            key={element.id}
            data={element}
          />
        ))
      }
    </div>
  );
}
