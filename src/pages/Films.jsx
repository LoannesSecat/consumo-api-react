import Film from "@/components/Film";
import Header from "@/components/Header";
import FilmsPagination from "@/components/FilmsPagination";
import "@/utils/styles/Films.scss";
import Empty from "@/components/Empty";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";

const Films = () => {
  const dataFilms = useSelector((e) => e.film.films);

  const CompFimls = () => {
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

      <CompFimls />
    </>
  );
};

export default Films;
