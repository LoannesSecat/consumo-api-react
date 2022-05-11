import React from "react";
import Film from "@/components/Film";
import Header from "@/components/Header";
import FilmsPagination from "@/components/FilmsPagination";
import "@/utils/styles/Films.scss";
import Empty from "@/components/Empty";
import { useSelector } from "react-redux";

const Films = () => {
  const dataFilms = useSelector((data) => data.film.films);

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
