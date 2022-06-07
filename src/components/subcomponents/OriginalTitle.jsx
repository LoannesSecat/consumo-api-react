export default function OriginalTitle({ param }) {
  if (param) {
    return (
      <dl>
        <dt className="subtitle">Título original</dt>
        <dd className="subtext">{param}</dd>
      </dl>
    );
  }

  return null;
}
