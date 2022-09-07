import { useLocation } from "wouter";
import "~/utils/styles/Details.scss";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import HandleLoading from "~/components/HandleLoading";
import SerieDetails from "~/components/SerieDetails";
import FilmDetails from "~/components/FilmDetails";
import PersonDetails from "~/components/PersonDetails";

scrollTo(0, 0);

export default function Details() {
  const [, navigation] = useLocation();
  const {
    filmDetails, personDetails, serieDetails, typeMedia,
  } = useSelector((e) => e.film);
  let auxComponent;
  let auxData;

  switch (typeMedia) {
    case "tv":
      auxData = serieDetails;
      auxComponent = SerieDetails;
      break;
    case "movie":
      auxData = filmDetails;
      auxComponent = FilmDetails;
      break;
    case "person":
      auxData = personDetails;
      auxComponent = PersonDetails;
      break;

    default:
      auxData = [];
      auxComponent = null;
      break;
  }

  return (
    <div className="Details">
      <Header>
        <button onClick={() => navigation("/")}>Volver</button>
      </Header>

      <HandleLoading
        data={auxData}
        Component={auxComponent}
      />
    </div>
  );
}
