import { useLocation } from "wouter";
import "@/utils/styles/SelectedFilm.scss";
import HandleImage from "@/components/HandleImage";
import { Languages } from "@/utils/Translator";
import {
  HandleCompanies,
  HandleCountry,
  HandleDate,
  HandleGenres,
  Handler,
  HandlerSeasons,
  HandleSpokenLan,
  HandleTagline,
  HandleTitle,
} from "@/components/SelectedFilmDetails";
import Header from "@/components/Header";
import { useSelector } from "react-redux";

const SelectedFilm = () => {
  const filmDetails = useSelector((data) => data.film.filmDetails);
  const [, setLocation] = useLocation();

  scroll(null, 0); //Scroll to top
  console.log(filmDetails);
  return (
    <div className="SelectedFilm">
      <Header>
        <button onClick={() => setLocation(location.origin + "/home")}>
          Volver
        </button>
      </Header>

      <div className="banner">
        <HandleImage
          data={{
            backdrop: filmDetails.backdrop_path,
            poster: filmDetails.poster_path,
            img_required: "backdrop",
          }}
        />
        <div className="titles">
          <h1>
            {HandleTitle({
              title: filmDetails.title,
              name: filmDetails.name,
            })}
          </h1>
          {HandleTagline({
            tagline: filmDetails.tagline,
            title: filmDetails.title,
            name: filmDetails.name,
          })}
        </div>
      </div>

      <div className="details">
        {HandleGenres(filmDetails.genres)}
        {filmDetails.overview ? <p>{filmDetails.overview}</p> : <br />}

        <dl>
          <dt className="subtitle">Idioma original</dt>
          <dd className="subtext">
            {Languages(filmDetails.original_language)}
          </dd>
        </dl>

        <dl>
          <dt className="subtitle">Título original</dt>
          <dd className="subtext">
            {filmDetails.original_title
              ? filmDetails.original_title
              : filmDetails.original_name}
          </dd>
        </dl>

        <dl>
          <dt className="subtitle">Popularidad</dt>
          <dd className="subtext">{filmDetails.popularity}</dd>
        </dl>

        {HandleCompanies(filmDetails.production_companies)}
        {HandleCountry(filmDetails.production_countries)}

        <dl>
          <dt className="subtitle">Lenguajes hablados</dt>
          {HandleSpokenLan(filmDetails.spoken_languages)}
        </dl>

        {Handler({ value: filmDetails.budget, subtitle: "Presupuesto" })}
        {Handler({ value: filmDetails.revenue, subtitle: "Ingresos" })}

        <dl>
          <dt className="subtitle">Estado</dt>
          <dd className="subtext">{filmDetails.status}</dd>
        </dl>

        {HandleDate({
          date: filmDetails.release_date,
          first_date: filmDetails.first_air_date,
          last_date: filmDetails.last_air_date,
        })}

        {Handler({
          value: filmDetails.number_of_episodes,
          subtitle: "Número de episodios",
        })}
        {HandlerSeasons(filmDetails.seasons)}

        <dl>
          <dt className="subtitle">Duración</dt>
          <dd className="subtext">{filmDetails.runtime} Min</dd>
        </dl>

        <dl>
          <dt className="subtitle">Votación promedio</dt>
          <dd className="subtext">{filmDetails.vote_average}</dd>
        </dl>

        <dl>
          <dt className="subtitle">Votaciones</dt>
          <dd className="subtext">
            {filmDetails.vote_count?.toLocaleString()}
          </dd>
        </dl>

        <dl>
          <dt className="subtitle">Página</dt>
          <dd className="subtext">{filmDetails.homepage}</dd>
        </dl>
      </div>
    </div>
  );
};

export default SelectedFilm;
