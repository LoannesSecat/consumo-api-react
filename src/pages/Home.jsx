import Film from "../components/Film";
import Header from "../components/Header";
import "../utils/styles/Films.scss";
import Empty from "../components/Empty";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { ReadFilms } from "../redux/actions/FilmActions";
import { useEffect } from "react";
import FilmsPagination from "../components/FilmsPagination";

export default function Home() {
  useEffect(() => ReadFilms(), []);

  const dataFilms = useSelector((e) => e.film.films);

  const CompFilms = () => {
    if (dataFilms === "loading") return <Loading />;

    if (dataFilms?.length) {
      return (
        <>
          <div className="Films">
            {dataFilms?.map((e, i) => (
              <Film data={e} key={i} />
            ))}
          </div>

          <FilmsPagination />
        </>
      );
    }

    return <Empty />;
  };

  return (
    <>
      <Header>
        <div>Inicio</div>
        <input type="text" />
      </Header>

      <CompFilms />
    </>
  );
}
