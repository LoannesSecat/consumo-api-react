import Empty from "./Empty";
import Loading from "./Loading";

export default function HandleLoading({ data, component }) {
  if (data === "loading") return <Loading />;

  return Object.keys(data).length ? component : <Empty />;
  /* if (data) return <Empty />; */
  /*  data.length ? */
  /*  if (Object.keys(filmsDetails).length || personDetails.length) {
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
            <SelectedFilmDetails
              data={media_type === "person" ? personDetails : filmsDetails}
            />
          </div>
        </>
      );
    }*/
}
