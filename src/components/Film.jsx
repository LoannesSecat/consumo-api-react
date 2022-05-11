import "@/utils/styles/Film.scss";
import HandleImage from "@/components/HandleImage";

const Film = ({ data }) => {
  return (
    <div className="Film">
      <HandleImage
        data={{
          id: data.id,
          media_type: data.media_type,
          poster: data.poster_path,
          backdrop: data.backdrop_path,
          img_required: "poster",
        }}
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
