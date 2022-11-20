export default function OriginalTitle({ param, className }) {
  if (param) {
    return (
      <dl>
        <dt className={className.sTitle}>Título original</dt>
        <dd className={className.sText}>{param}</dd>
      </dl>
    );
  }

  return null;
}
