export default function Genres({ param, className }) {
  if (param?.length) {
    return (
      <ul className={className}>
        {param?.map((element) => (
          <li key={element.id}>{element.name}</li>
        ))}
      </ul>
    );
  }

  return null;
}
