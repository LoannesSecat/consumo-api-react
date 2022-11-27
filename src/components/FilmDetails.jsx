import { Currency, MyDate } from "~/utils/Converter";
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

export default function FilmDetails({ data } = {} = {}) {
  const {
    backdrop_path,
    title,
    tagline,
    genres,
    overview,
    original_language,
    original_title,
    popularity,
    production_companies,
    production_countries,
    spoken_languages,
    budget,
    revenue,
    status,
    release_date,
    runtime,
    vote_average,
    vote_count,
    homepage,
  } = data;

  return (
    <>
      <article className={styles.banner}>
        <HandleImage
          url={backdrop_path}
          size="w1280"
          className={{ style: styles.film_img, not_found: styles.img_not_found }}
          alt={`Fondo de la película: ${title}`}
        />

        <div className={styles.titles}>
          <h2>{title}</h2>
          {tagline && tagline?.length > 0 ? <h3>{tagline}</h3> : null}
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
          param={original_title}
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

        {budget ? (
          <dl>
            <dt className={styles.subtitle}>Presupuesto</dt>
            <dd className={styles.subtext}>{Currency(budget)}</dd>
          </dl>
        ) : null}

        {revenue ? (
          <dl>
            <dt className={styles.subtitle}>Ingresos</dt>
            <dd className={styles.subtext}>{Currency(revenue)}</dd>
          </dl>
        ) : null}

        <Status param={status} className={{ sTitle: styles.subtitle, sText: styles.subtext }} />

        <dl>
          <dt className={styles.subtitle}>Fecha de publicación</dt>
          <dd className={styles.subtext}>{MyDate(release_date)}</dd>
        </dl>

        {runtime ? (
          <dl>
            <dt className={styles.subtitle}>Duración</dt>
            <dd className={styles.subtext}>
              {runtime}
              {" "}
              Minutos
            </dd>
          </dl>
        ) : null}

        {vote_average ? (
          <dl>
            <dt className={styles.subtitle}>Votación promedio</dt>
            <dd className={styles.subtext}>{vote_average}</dd>
          </dl>
        ) : null}

        {vote_count ? (
          <dl>
            <dt className={styles.subtitle}>Votaciones</dt>
            <dd className={styles.subtext}>{vote_count}</dd>
          </dl>
        ) : null}

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
