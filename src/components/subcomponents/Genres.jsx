export default function Genres({ param }) {
  if (param?.length) {
    return (
      <div className="genres">
        {param?.map((element) => (
          <small key={element.id}>{element.name}</small>
        ))}
      </div>
    );
  }

  return null;
}
