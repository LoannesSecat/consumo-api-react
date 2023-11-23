import { mediaTranslations } from "~/utils/constants";

export default function Status({ param, className }) {
  const TEXT_TRANSLATED = mediaTranslations[param];

  if (param) {
    return (
      <dl>
        <dt className={className.sTitle}>Estado</dt>
        <dd className={className.sText}>{TEXT_TRANSLATED}</dd>
      </dl>
    );
  }

  return null;
}
