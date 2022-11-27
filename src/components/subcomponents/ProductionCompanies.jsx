export default function ProductionCompanies({ param, className }) {
  if (param?.length) {
    return (
      <dl>
        <dt className={className.sTitle}>
          {param?.length > 1 ? "Productoras" : "Productora"}
        </dt>
        {param?.map((element) => (
          <dd key={element.id} className={className.sText}>
            {element.name}
          </dd>
        ))}
      </dl>
    );
  }

  return null;
}
