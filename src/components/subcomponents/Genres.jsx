export default function Genres({ param, className }) {
  if (param?.length) {
    return (
      <div className={className}>
        {param?.map((element) => (
          <small key={element.id}>{element.name}</small>
        ))}
      </div>
    );
  }

  return null;
}
