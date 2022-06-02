import { Languages } from "../../utils/Converter";

export default function SpokenLanguages({ param }) {
  if (param?.length)
    return (
      <dl>
        <dt className="subtitle">Lenguajes hablados</dt>
        {param?.map((e, i) => (
          <dd key={i} className="subtext">
            {Languages(e.iso_639_1)}
          </dd>
        ))}
      </dl>
    );

  return null;
}
