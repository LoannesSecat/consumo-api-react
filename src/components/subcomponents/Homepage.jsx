export default function Homepage({ param }) {
  if (param) {
    return (
      <dl>
        <dt className="subtitle">Sitio web</dt>
        <a
          className="subtext homepage"
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
