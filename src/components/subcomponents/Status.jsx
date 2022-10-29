import Translations from "~/utils/Translations.json";

export default function Status({ param }) {
  const TEXT_TRANSLATED = Translations.MediaStatus[param];

  if (param) {
    return (
      <dl>
        <dt className="subtitle">Estado</dt>
        <dd className="subtext">{TEXT_TRANSLATED}</dd>
      </dl>
    );
  }

  return null;
}
