import { Countries } from "~/utils/Converter";

export default function ProductionCountries({ param }) {
  if (param?.length) {
    return (
      <dl>
        <dt className="subtitle">
          {param?.length > 1 ? "Países de producción" : "País de producción"}
        </dt>

        {param?.map((element) => (
          <dd className="subtext" key={element.iso_3166_1}>
            {Countries(element.iso_3166_1)}
          </dd>
        ))}
      </dl>
    );
  }

  return null;
}
