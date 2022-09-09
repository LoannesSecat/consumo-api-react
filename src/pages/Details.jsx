import { useSelector } from "react-redux";
import { useLocation } from "wouter";
import FilmDetails from "~/components/FilmDetails";
import HandleLoading from "~/components/HandleLoading";
import PersonDetails from "~/components/PersonDetails";
import SerieDetails from "~/components/SerieDetails";
import "~/utils/styles/Details.scss";
import Header from "../components/Header";

scrollTo(0, 0);

export default function Details() {
  const [, navigation] = useLocation();
  const {
    filmDetails, personDetails, serieDetails, typeMedia,
  } = useSelector((e) => e.film);
  let auxComponent;
  let auxData;
  console.log("DETAILS");

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
