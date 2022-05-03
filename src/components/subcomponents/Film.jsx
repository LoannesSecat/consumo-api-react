import { useLocation } from "wouter";
import "../../helpers/styles/Film.scss";
import { FilmDetails } from "../../actions/FilmActions";
import HandleImage from "../../helpers/HandleImage";

const Film = ({ data }) => {
  const [location, setLocation] = useLocation();

  const HandleDetails = (media_type, id) => {
    FilmDetails({ media_type: media_type, id: id });
    setLocation(`${location}/details`);
  };

  return (
    <div className="Film">
      <img
        src={HandleImage(data.poster_path, data.backdrop_path)}
        onClick={() => HandleDetails(data.media_type, data.id)}
      />
      <div className="info">
        <h2>{data.title ? data.title : data.name}</h2>
        {data.overview ? <p>{data.overview}</p> : null}
        <span>{data.media_type == "movie" ? "Película" : data.media_type}</span>
        <br />
        <span>
          {data.release_date ? data.release_date : data.first_air_date}
        </span>
      </div>
    </div>
  );
};

export default Film;
