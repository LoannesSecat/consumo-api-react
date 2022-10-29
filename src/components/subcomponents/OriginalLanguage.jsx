import { Languages } from "~/utils/Converter";

export default function OriginalLanguage({ param }) {
  if (param) {
    return (
      <dl>
        <dt className="subtitle">Idioma original</dt>
        <dd className="subtext">{Languages(param)}</dd>
      </dl>
    );
  }

  return null;
}
