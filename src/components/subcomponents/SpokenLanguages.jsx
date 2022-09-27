import { Languages } from "~/utils/Converter";

export default function SpokenLanguages({ param }) {
  if (param?.length) {
    return (
      <dl>
        <dt className="subtitle">Lenguajes hablados</dt>
        {param?.map((element) => (
          <dd key={element.iso_639_1} className="subtext">
            {Languages(element.iso_639_1)}
          </dd>
        ))}
      </dl>
    );
  }

  return null;
}
