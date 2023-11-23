import { Countries } from "~/utils/functions.js";

export default function ProductionCountries({ param, className }) {
  if (param?.length) {
    return (
      <dl>
        <dt className={className.sTitle}>
          {param?.length > 1 ? "Países de producción" : "País de producción"}
        </dt>

        {param?.map((element) => (
          <dd className={className.sText} key={element.iso_3166_1}>
            {Countries(element.iso_3166_1)}
          </dd>
        ))}
      </dl>
    );
  }

  return null;
}
