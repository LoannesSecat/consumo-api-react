import { Fragment } from "react";

export const HandleTitle = ({ title, name }) => {
  let myTitle = "Sin título";

  if (title != null) {
    return title;
  }

  if (name != null) {
    return name;
  }

  return myTitle;
};

export const HandleTagline = ({ tagline, title, name }) => {
  if (tagline?.length > 0 && (title && name) != tagline) {
    return <h2>{tagline}</h2>;
  }

  return null;
};

export const HandleGenres = (genres) => {
  return genres?.map((e, index, arr) => (
    <Fragment key={index}>
      <small className="genres">{e.name}</small>
      {index != arr.length - 1 ? " " : <br />}
    </Fragment>
  ));
};

export const HandleCompanies = (arr) => {
  if (arr) {
    return (
      <dl>
        <dt className="subtitle">
          {arr.length > 1 ? "Productoras" : "Productora"}
        </dt>
        {arr.map((e, i) => (
          <dd key={i} className="subtext">
            {e.name}
          </dd>
        ))}
      </dl>
    );
  }
};

export const HandleCountry = (arr) => {
  return arr?.map((e, i) => (
    <dl key={i}>
      <dt className="subtitle">
        {arr.length > 1 ? "Países de producción" : "País de producción"}
      </dt>
      <dd className="subtext">{e.name}</dd>
    </dl>
  ));
};

export const HandleSpokenLan = (arr) => {
  return arr?.map((e, i) => (
    <dd key={i} className="subtext">
      {e.english_name}
    </dd>
  ));
};

export const HandleDate = ({ date, first_date, last_date }) => {
  if (date) {
    return (
      <dl>
        <dt className="subtitle">Fecha de publicación</dt>
        <dd className="subtext">{date}</dd>
      </dl>
    );
  }

  if (first_date && last_date) {
    return (
      <>
        <dl>
          <dt className="subtitle">Primera emision</dt>
          <dd className="subtext">{first_date}</dd>
        </dl>

        <dl>
          <dt className="subtitle">última emision</dt>
          <dd className="subtext">{last_date}</dd>
        </dl>
      </>
    );
  }
};

export const HandlerSeasons = (arr) => {
  if (arr) {
    return (
      <>
        <span className="subtitle">Temporadas</span>
        <ul className="seasons">
          {arr.map((e, i) => (
            <li key={i}>
              <span className="subtext">{e.name}</span>
              <ul>
                <li>Emision: {e.air_date}</li>
                <li>Episodios: {e.episode_count}</li>
              </ul>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return null;
};

export const Handler = ({ value, subtitle }) => {
  if (value) {
    return (
      <dl>
        <dt className="subtitle">{subtitle}</dt>
        <dd className="subtext">
          {typeof value != "number" ? value : value.toLocaleString()}
        </dd>
      </dl>
    );
  }

  return null;
};
