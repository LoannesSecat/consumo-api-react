import { MyDate } from "~/utils/Converter";
import HandleImage from "./HandleImage";
import Genres from "./subcomponents/Genres";
import OriginalLanguage from "./subcomponents/OriginalLanguage";
import OriginalTitle from "./subcomponents/OriginalTitle";
import Paragraph from "./subcomponents/Paragraph";
import Popularity from "./subcomponents/Popularity";
import ProductionCompanies from "./subcomponents/ProductionCompanies";
import ProductionCountries from "./subcomponents/ProductionCountries";
import SpokenLanguages from "./subcomponents/SpokenLanguages";
import Status from "./subcomponents/Status";

export default function SerieDetails({ data }) {
  const {
    backdrop_path,
    name,
    tagline,
    genres,
    overview,
    original_language,
    original_name,
    popularity,
    production_companies,
    production_countries,
    spoken_languages,
    status,
    first_air_date,
    last_air_date,
    last_episode_to_air,
    next_episode_to_air,
    number_of_episodes,
    seasons,
    homepage,
    in_production,
    type,
  } = data;

  const lastEpisodeText = (
    <>
      Episodio N°
      {last_episode_to_air.episode_number}
      {" "}
      de la temporada
      {" "}
      {last_episode_to_air.season_number}
      {" "}
      <small>
        (
        {last_episode_to_air.air_date}
        )
      </small>
    </>
  );

  const nextEpisodeText = (
    <>
      Episodio N°
      {" "}
      {next_episode_to_air?.episode_number}
      {" "}
      de la temporada
      {" "}
      {last_episode_to_air.season_number}
      {" "}
      <small>
        (
        {last_episode_to_air.air_date}
        )
      </small>
    </>
  );

  return (
    <>
      <div className="banner">
        <HandleImage
          url={{
            backdrop_path,
          }}
          size="w1280"
          toShow="backdrop"
          className="serie-img"
        />

        <div className="titles">
          <h1>{name}</h1>
          {tagline.length > 0 && tagline ? <h2>{tagline}</h2> : null}
        </div>
      </div>

      <div className="info">
        <Genres param={genres} />
        <Paragraph param={overview} />
        <OriginalLanguage param={original_language} />
        <OriginalTitle param={original_name} />
        <Popularity param={popularity} />
        <ProductionCompanies param={production_companies} />
        <ProductionCountries param={production_countries} />
        <SpokenLanguages param={spoken_languages} />
        <Status param={status} />
        <dl>
          <dt className="subtitle">En producción actualmente</dt>
          <dd className="subtext">{in_production ? "Si" : "No"}</dd>
        </dl>
        <dl>
          <dt className="subtitle">Tipo de serie</dt>
          <dd className="subtext">{type}</dd>
        </dl>
        <dl>
          <dt className="subtitle">Número total de episodios</dt>
          <dd className="subtext">{number_of_episodes}</dd>
        </dl>

        <dl>
          <dt className="subtitle">Fecha de primera emisión</dt>
          <dd className="subtext">{MyDate(first_air_date)}</dd>
        </dl>

        <dl>
          <dt className="subtitle">Fecha de última emisión</dt>
          <dd className="subtext">{MyDate(last_air_date)}</dd>
        </dl>

        {last_episode_to_air ? (
          <dl>
            <dt className="subtitle">Último episodio al aire</dt>
            <dd className="subtext">
              {lastEpisodeText}
            </dd>
          </dl>
        ) : null}

        {next_episode_to_air ? (
          <dl>
            <dt className="subtitle">Siguiente episodio al aire</dt>
            <dd className="subtext">
              {nextEpisodeText}
            </dd>
          </dl>
        ) : null}

        <span className="subtitle">Temporadas</span>
        <ul className="seasons">
          {seasons.map((element) => (
            <li key={element.id}>
              <span className="subtitle">{element.name}</span>

              <ul>
                <li>
                  <span className="subtitle">Inicio de emisión: </span>
                  <span className="subtext">{element.air_date ? MyDate(element.air_date) : "Dato desconocido"}</span>
                </li>
                <li>
                  <span className="subtitle">Episodios: </span>
                  <span className="subtext">{element.episode_count || "Dato desconocido"}</span>
                </li>
              </ul>
            </li>
          ))}
        </ul>

        {homepage ? (
          <dl>
            <dt className="subtitle">Sitio web</dt>
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
      </div>
    </>
  );
}
