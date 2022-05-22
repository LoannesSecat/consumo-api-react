import { useLocation } from "wouter";
import "@/utils/styles/SelectedFilm.scss";
import HandleImage from "@/components/HandleImage";
import SelectedFilmDetails from "@/components/SelectedFilmDetails";
import Header from "@/components/Header";
import { useSelector } from "react-redux";

const SelectedFilm = () => {
  scroll(null, 0); //Scroll to top
  const [, setLocation] = useLocation();
  const details = useSelector((data) => data.film.filmDetails);
  const { backdrop_path, poster_path, title, name, tagline, media_type } =
    details;

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
            backdrop: backdrop_path,
            poster: poster_path,
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
    </div>
  );
};

export default SelectedFilm;
