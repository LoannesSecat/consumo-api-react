import Film from "@/components/Film";
import Header from "@/components/Header";
import FilmsPagination from "@/components/FilmsPagination";
import "@/utils/styles/Films.scss";
import Empty from "@/components/Empty";
import useStore from "@/hooks/useStore";
import { useSelector } from "react-redux";

//useSelector((data) => data.film.films);

const Films = () => {
  const dataFilms = useSelector((data) => data.film.films); //useStore({ reducer: "film", value: "films" });

  const CompFimls = (
    <>
      <div className="Films">
        {dataFilms?.map((e, i) => (
          <Film data={e} key={i} />
        ))}
      </div>

      <FilmsPagination />
    </>
  );

  return (
    <>
      <Header>
        <div>Inicio</div>
        <input type="text" />
      </Header>

      {dataFilms?.length ? CompFimls : <Empty />}
    </>
  );
};

export default Films;
