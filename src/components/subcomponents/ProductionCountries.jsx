import { Countries } from "~/utils/Converter";

export default function ProductionCountries({ param }) {
  if (param?.length)
    return (
      <dl>
        <dt className="subtitle">
          {param?.length > 1 ? "Países de producción" : "País de producción"}
        </dt>

        {param?.map((e, i) => (
          <dd className="subtext" key={i}>
            {Countries(e.iso_3166_1)}
          </dd>
        ))}
      </dl>
    );

  return null;
}
