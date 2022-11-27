export default function Popularity({ param, className }) {
  if (param) {
    return (
      <dl>
        <dt className={className.sTitle}>Popularidad</dt>
        <dd className={className.sText}>{param}</dd>
      </dl>
    );
  }

  return null;
}
