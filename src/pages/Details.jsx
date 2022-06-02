import { useLocation } from "wouter";
import "../utils/styles/Details.scss";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Empty from "../components/Empty";
import HandleLoading from "../components/HandleLoading";
import SerieDetails from "../components/SerieDetails";
import FilmDetails from "../components/FilmDetails";
import PersonDetails from "../components/PersonDetails";

export default function Details() {
  scroll(null, 0); //Scroll to top
  const [, navigation] = useLocation();
  const films_details = useSelector((e) => e.film.filmDetails);
  const person_details = useSelector((e) => e.film.personDetails);
  const serie_details = useSelector((e) => e.film.serieDetails);
  const type_media = useSelector((e) => e.film.mediaType);

  const Content = () => {
    switch (type_media) {
      case "tv":
        return (
          <HandleLoading data={serie_details} component={<SerieDetails />} />
        );
      case "movie":
        return (
          <HandleLoading data={films_details} component={<FilmDetails />} />
        );
      case "person":
        return (
          <HandleLoading data={person_details} component={<PersonDetails />} />
        );

      default:
        return <Empty />;
    }
  };

  return (
    <div className="Details">
      <Header>
        <button onClick={() => navigation("/")}>Volver</button>
      </Header>

      <Content />
    </div>
  );
}
