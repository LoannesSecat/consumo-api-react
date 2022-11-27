import { Languages } from "~/utils/Converter";

export default function SpokenLanguages({ param, className }) {
  if (param?.length) {
    return (
      <dl>
        <dt className={className.sTitle}>Lenguajes hablados</dt>
        {param?.map((element) => (
          <dd key={element.iso_639_1} className={className.sText}>
            {Languages(element.iso_639_1)}
          </dd>
        ))}
      </dl>
    );
  }

  return null;
}
