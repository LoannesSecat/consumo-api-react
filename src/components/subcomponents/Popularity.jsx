export default function Popularity({ param }) {
  if (param) {
    return (
      <dl>
        <dt className="subtitle">Popularidad</dt>
        <dd className="subtext">{param}</dd>
      </dl>
    );
  }

  return null;
}
