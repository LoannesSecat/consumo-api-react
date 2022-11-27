import { MyDate } from "~/utils/Converter";
import styles from "~/utils/styles/media-details.module.scss";
import HandleImage from "./HandleImage";
import Genres from "./subcomponents/Genres";
import Homepage from "./subcomponents/Homepage";
import OriginalLanguage from "./subcomponents/OriginalLanguage";
import OriginalTitle from "./subcomponents/OriginalTitle";
import Paragraph from "./subcomponents/Paragraph";
import Popularity from "./subcomponents/Popularity";
import ProductionCompanies from "./subcomponents/ProductionCompanies";
import ProductionCountries from "./subcomponents/ProductionCountries";
import SpokenLanguages from "./subcomponents/SpokenLanguages";
import Status from "./subcomponents/Status";

export default function SerieDetails({ data } = {} = {}) {
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
      {last_episode_to_air?.episode_number}
      {" "}
      de la temporada
      {" "}
      {last_episode_to_air?.season_number}
      {" "}
      <small>
        (
        {last_episode_to_air?.air_date}
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
      {last_episode_to_air?.season_number}
      {" "}
      <small>
        (
        {last_episode_to_air?.air_date}
        )
      </small>
    </>
  );

  return (
    <>
      <article className={styles.banner}>
        <HandleImage
          url={backdrop_path}
          size="w1280"
          className={{
            style: styles.serie_img,
            not_found: styles.img_not_found,
          }}
          alt={`Fondo de la serie: ${name}`}
        />

        <div className={styles.titles}>
          <h2>{name}</h2>
          {tagline && tagline.length > 0 ? <h3>{tagline}</h3> : null}
        </div>
      </article>

      <article className={styles.info}>
        <Genres param={genres} className={styles.genres} />
        <Paragraph param={overview} />
        <OriginalLanguage
          param={original_language}
          className={{ sTitle: styles.subtitle, sText: styles.subtext }}
        />
        <OriginalTitle
          param={original_name}
          className={{ sTitle: styles.subtitle, sText: styles.subtext }}
        />
        <Popularity
          param={popularity}
          className={{ sTitle: styles.subtitle, sText: styles.subtext }}
        />
        <ProductionCompanies
          param={production_companies}
          className={{ sTitle: styles.subtitle, sText: styles.subtext }}
        />
        <ProductionCountries
          param={production_countries}
          className={{ sTitle: styles.subtitle, sText: styles.subtext }}
        />
        <SpokenLanguages
          param={spoken_languages}
          className={{ sTitle: styles.subtitle, sText: styles.subtext }}
        />
        <Status
          param={status}
          className={{ sTitle: styles.subtitle, sText: styles.subtext }}
        />

        <dl>
          <dt className={styles.subtitle}>En producción actualmente</dt>
          <dd className={styles.subtext}>{in_production ? "Si" : "No"}</dd>
        </dl>
        <dl>
          <dt className={styles.subtitle}>Tipo de serie</dt>
          <dd className={styles.subtext}>{type}</dd>
        </dl>
        <dl>
          <dt className={styles.subtitle}>Número total de episodios</dt>
          <dd className={styles.subtext}>{number_of_episodes}</dd>
        </dl>
        <dl>
          <dt className={styles.subtitle}>Fecha de primera emisión</dt>
          <dd className={styles.subtext}>{MyDate(first_air_date)}</dd>
        </dl>
        <dl>
          <dt className={styles.subtitle}>Fecha de última emisión</dt>
          <dd className={styles.subtext}>{MyDate(last_air_date)}</dd>
        </dl>

        {last_episode_to_air ? (
          <dl>
            <dt className={styles.subtitle}>Último episodio al aire</dt>
            <dd className={styles.subtext}>
              {lastEpisodeText}
            </dd>
          </dl>
        ) : null}

        {next_episode_to_air ? (
          <dl>
            <dt className={styles.subtitle}>Siguiente episodio al aire</dt>
            <dd className={styles.subtext}>
              {nextEpisodeText}
            </dd>
          </dl>
        ) : null}

        <span className={styles.subtitle}>Temporadas</span>
        <ul className={styles.seasons}>
          {seasons
            ? seasons?.map((element) => (
              <li key={element.id}>
                <span className={styles.subtitle}>{element.name}</span>
                <ul>
                  <li>
                    <span className={styles.subtitle}>Inicio de emisión: </span>
                    <span className={styles.subtext}>{element.air_date ? MyDate(element.air_date) : "Dato desconocido"}</span>
                  </li>
                  <li>
                    <span className={styles.subtitle}>Episodios: </span>
                    <span className={styles.subtext}>{element.episode_count || "Dato desconocido"}</span>
                  </li>
                </ul>
              </li>
            ))
            : null}
        </ul>

        <Homepage
          param={homepage}
          className={{
            sTitle: styles.subtitle,
            sText: styles.subtext,
            h: styles.homepage,
          }}
        />
      </article>
    </>
  );
}
