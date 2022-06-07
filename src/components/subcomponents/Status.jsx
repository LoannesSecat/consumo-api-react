export default function Status({ param }) {
  if (param)
    return (
      <dl>
        <dt className="subtitle">Estado</dt>
        <dd className="subtext">{param}</dd>
      </dl>
    );

  return null;
}
