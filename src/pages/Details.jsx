import { useLocation } from "wouter";
import "../utils/styles/Details.scss";
import HandleImage from "../components/HandleImage";
import SelectedFilmDetails from "../components/SelectedFilmDetails";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Empty from "../components/Empty";

export default function Details() {
  scroll(null, 0); //Scroll to top
  const [, navigation] = useLocation();
  const details = useSelector((e) => e.film.filmDetails);
  const { backdrop_path, poster_path, title, name, tagline, media_type } =
    details;

  const Content = () => {
    if (details === "loading") return <Loading />;

    if (Object.keys(details).length) {
      return (
        <>
          <div className="banner">
            <HandleImage
              data={{
                backdrop_path: backdrop_path,
                poster_path: poster_path,
                img_required: "backdrop",
              }}
            />

            <div className="titles">
              <h1>{media_type === "movie" ? title : name}</h1>
              {tagline?.length > 0 && (title || name) != tagline ? (
                <h2>{tagline}</h2>
              ) : null}
            </div>
          </div>

          <div className="details">
            <SelectedFilmDetails data={details} />
          </div>
        </>
      );
    }

    return <Empty />;
  };

  return (
    <div className="SelectedFilm">
      <Header>
        <button onClick={() => navigation("/")}>Volver</button>
      </Header>

      <Content />
    </div>
  );
}
