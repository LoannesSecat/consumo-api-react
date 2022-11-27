export default function Homepage({ param, className }) {
  if (param) {
    return (
      <dl>
        <dt className={className.sTitle}>Sitio web</dt>
        <a
          className={`${className.sText} ${className.h}`}
          href={param}
          target="_blank"
          rel="noreferrer noopener"
        >
          {param}
        </a>
      </dl>
    );
  }

  return null;
}
