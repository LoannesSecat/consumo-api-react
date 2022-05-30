import { Fragment } from "react";
import { Languages, Countries, Currency, MyDate } from "../utils/Converter";

export default function SelectedFilmDetails({ data }) {
  const {
    genres,
    overview,
    original_language,
    original_title,
    original_name,
    popularity,
    production_companies,
    production_countries,
    spoken_languages,
    budget,
    revenue,
    status,
    release_date,
    first_air_date,
    last_air_date,
    media_type,
    number_of_episodes,
    seasons,
    runtime,
    vote_average,
    vote_count,
    homepage,
  } = data;

  return (
    <>
      {genres?.length ? (
        <div className="genres">
          {genres?.map((e, index) => (
            <Fragment key={index}>
              <small>{e.name}</small>
            </Fragment>
          ))}
        </div>
      ) : null}

      {overview?.length ? <p>{overview}</p> : null}

      <dl>
        <dt className="subtitle">Idioma original</dt>
        <dd className="subtext">{Languages(original_language)}</dd>
      </dl>

      <dl>
        <dt className="subtitle">Título original</dt>
        <dd className="subtext">
          {original_title ? original_title : original_name}
        </dd>
      </dl>

      <dl>
        <dt className="subtitle">Popularidad</dt>
        <dd className="subtext">{popularity}</dd>
      </dl>

      {production_companies.length ? (
        <dl>
          <dt className="subtitle">
            {production_companies?.length > 1 ? "Productoras" : "Productora"}
          </dt>
          {production_companies?.map((e, i) => (
            <dd key={i} className="subtext">
              {e.name}
            </dd>
          ))}
        </dl>
      ) : null}

      {production_countries?.map((e, i) => (
        <dl key={i}>
          <dt className="subtitle">
            {production_countries?.length > 1
              ? "Países de producción"
              : "País de producción"}
          </dt>
          <dd className="subtext">{Countries(e.iso_3166_1)}</dd>
        </dl>
      ))}

      {spoken_languages.length ? (
        <dl>
          <dt className="subtitle">Lenguajes hablados</dt>
          {spoken_languages?.map((e, i) => (
            <dd key={i} className="subtext">
              {Languages(e.iso_639_1)}
            </dd>
          ))}
        </dl>
      ) : null}

      {budget ? (
        <dl>
          <dt className="subtitle">Presupuesto</dt>
          <dd className="subtext">{Currency(budget)}</dd>
        </dl>
      ) : null}

      {revenue ? (
        <dl>
          <dt className="subtitle">Presupuesto</dt>
          <dd className="subtext">{Currency(revenue)}</dd>
        </dl>
      ) : null}

      <dl>
        <dt className="subtitle">Estado</dt>
        <dd className="subtext">{status}</dd>
      </dl>

      {media_type === "tv" ? (
        <>
          <dl>
            <dt className="subtitle">Primera emision</dt>
            <dd className="subtext">{MyDate(first_air_date)}</dd>
          </dl>

          <dl>
            <dt className="subtitle">Última emision</dt>
            <dd className="subtext">{MyDate(last_air_date)}</dd>
          </dl>
        </>
      ) : (
        <dl>
          <dt className="subtitle">Fecha de publicación</dt>
          <dd className="subtext">{MyDate(release_date)}</dd>
        </dl>
      )}

      {media_type === "tv" ? (
        <dl>
          <dt className="subtitle">Número de episodios</dt>
          <dd className="subtext">{number_of_episodes}</dd>
        </dl>
      ) : null}

      {media_type === "tv" ? (
        <>
          <span className="subtitle">Temporadas</span>
          <ul className="seasons">
            {seasons.map((e, i) => (
              <li key={i}>
                <span className="subtext subtitle">{e.name}</span>
                <ul>
                  <li>
                    <span className="seasons-subtitle">Emision:</span>{" "}
                    {MyDate(e.air_date)}
                  </li>
                  <li>
                    <span className="seasons-subtitle">Episodios:</span>{" "}
                    {e.episode_count}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {runtime ? (
        <dl>
          <dt className="subtitle">Duración</dt>
          <dd className="subtext">{runtime} Min</dd>
        </dl>
      ) : null}

      <dl>
        <dt className="subtitle">Votación promedio</dt>
        <dd className="subtext">{vote_average}</dd>
      </dl>

      <dl>
        <dt className="subtitle">Votaciones</dt>
        <dd className="subtext">{vote_count}</dd>
      </dl>

      {homepage ? (
        <dl>
          <dt className="subtitle">Página</dt>
          <a
            className="subtext homepage"
            href={homepage}
            target="_blank"
            rel="noreferrer noopener"
          >
            {homepage}
          </a>
        </dl>
      ) : null}
    </>
  );
}
