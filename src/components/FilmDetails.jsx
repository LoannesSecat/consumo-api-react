import { useSelector } from "react-redux";
import { Currency, MyDate } from "../utils/Converter";
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

export default function FilmDetails({ data }) {
  const {
    backdrop_path,
    poster_path,
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
      <div className="banner">
        <HandleImage
          data={{ backdrop_path, poster_path }}
          img_required="backdrop"
        />

        <div className="titles">
          <h1>{title}</h1>
          {tagline?.length > 0 && tagline ? <h2>{tagline}</h2> : null}
        </div>
      </div>

      <div className="details">
        <Genres param={genres} />

        <Paragraph param={overview} />

        <OriginalLanguage param={original_language} />

        <OriginalTitle param={original_title} />

        <Popularity param={popularity} />

        <ProductionCompanies param={production_companies} />

        <ProductionCountries param={production_countries} />

        <SpokenLanguages param={spoken_languages} />

        {budget ? (
          <dl>
            <dt className="subtitle">Presupuesto</dt>
            <dd className="subtext">{Currency(budget)}</dd>
          </dl>
        ) : null}

        {revenue ? (
          <dl>
            <dt className="subtitle">Ingresos</dt>
            <dd className="subtext">{Currency(revenue)}</dd>
          </dl>
        ) : null}

        <Status param={status} />

        <dl>
          <dt className="subtitle">Fecha de publicación</dt>
          <dd className="subtext">{MyDate(release_date)}</dd>
        </dl>

        {runtime ? (
          <dl>
            <dt className="subtitle">Duración</dt>
            <dd className="subtext">{runtime} Minutos</dd>
          </dl>
        ) : null}

        {vote_average ? (
          <dl>
            <dt className="subtitle">Votación promedio</dt>
            <dd className="subtext">{vote_average}</dd>
          </dl>
        ) : null}

        {vote_count ? (
          <dl>
            <dt className="subtitle">Votaciones</dt>
            <dd className="subtext">{vote_count}</dd>
          </dl>
        ) : null}

        <Homepage param={homepage} />
      </div>
    </>
  );
}
