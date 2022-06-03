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
  const { filmDetails, personDetails, serieDetails, mediaType } = useSelector(
    (e) => e.film
  );

  const Content = () => {
    switch (mediaType) {
      case "tv":
        return (
          <HandleLoading data={serieDetails} component={<SerieDetails />} />
        );
      case "movie":
        return <HandleLoading data={filmDetails} component={<FilmDetails />} />;
      case "person":
        return (
          <HandleLoading data={personDetails} component={<PersonDetails />} />
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
