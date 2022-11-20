import { Languages } from "~/utils/Converter";

export default function OriginalLanguage({ param, className }) {
  if (param) {
    return (
      <dl>
        <dt className={className.sTitle}>Idioma original</dt>
        <dd className={className.sText}>{Languages(param)}</dd>
      </dl>
    );
  }

  return null;
}
