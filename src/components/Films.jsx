import { Fragment } from "react";
import Film from "./subcomponents/Film";
import Header from "./subcomponents/Header";
import FilmsPagination from "./subcomponents/FilmsPagination";
import "../helpers/styles/Films.scss";
import Empty from "./subcomponents/Empty";
import { useSelector } from "react-redux";

const Films = () => {
  const dataFilms = useSelector((data) => data.film.films);

  const CompFimls = (
    <div className="Films">
      {dataFilms?.map((e, i) => (
        <Film data={e} key={i} />
      ))}
    </div>
  );

  return (
    <Fragment>
      <Header>
        <div>Inicio</div>
        <input type="text" />
      </Header>

      {dataFilms?.length ? CompFimls : <Empty />}

      <FilmsPagination />
    </Fragment>
  );
};

export default Films;
