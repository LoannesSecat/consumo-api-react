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
  const [, navigation] = useLocation();
  const { film_details, person_details, serie_details, type_media } =
    useSelector((e) => e.film);

  const Content = () => {
    switch (type_media) {
      case "tv":
        return (
          <HandleLoading data={serie_details} component={<SerieDetails />} />
        );
      case "movie":
        return (
          <HandleLoading data={film_details} component={<FilmDetails />} />
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
