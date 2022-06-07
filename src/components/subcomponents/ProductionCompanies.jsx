export default function ProductionCompanies({ param }) {
  if (param?.length)
    return (
      <dl>
        <dt className="subtitle">
          {param?.length > 1 ? "Productoras" : "Productora"}
        </dt>
        {param?.map((e, i) => (
          <dd key={i} className="subtext">
            {e.name}
          </dd>
        ))}
      </dl>
    );

  return null;
}
