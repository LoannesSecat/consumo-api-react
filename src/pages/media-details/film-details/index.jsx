import Image from "~/components/Image";
import { Currency, MyDate } from "~/utils/functions.js";
import Genres from "../../../components/Genres";
import Homepage from "../../../components/Homepage";
import OriginalLanguage from "../../../components/OriginalLanguage";
import OriginalTitle from "../../../components/OriginalTitle";
import Paragraph from "../../../components/Paragraph";
import Popularity from "../../../components/Popularity";
import ProductionCompanies from "../../../components/ProductionCompanies";
import ProductionCountries from "../../../components/ProductionCountries";
import SpokenLanguages from "../../../components/SpokenLanguages";
import Status from "../../../components/Status";
import styles from "../media-details.module.scss";

export default function FilmDetails({ data } = {}) {
  const {
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
    backdrop_url,
  } = data;

  return (
    <>
      <picture className={styles.banner}>
        <Image
          src={backdrop_url}
          alt={`Fondo de la película: ${title}`}
          className={styles.film_img}
        />

        <hgroup className={styles.titles}>
          <h1 className={styles.media_title}>{title}</h1>
          {Boolean(tagline?.length) && <h2 className={styles.media_subtitle}>{tagline}</h2>}
        </hgroup>
      </picture>

      <section className={styles.info}>
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
      </section>
    </>
  );
}
