export default function ProductionCompanies({ param }) {
  if (param?.length) {
    return (
      <dl>
        <dt className="subtitle">
          {param?.length > 1 ? "Productoras" : "Productora"}
        </dt>
        {param?.map((element) => (
          <dd key={element.id} className="subtext">
            {element.name}
          </dd>
        ))}
      </dl>
    );
  }

  return null;
}
