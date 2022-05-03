import "../../helpers/styles/FilmsPagination.scss";
import { useSelector } from "react-redux";
import { ReadFilms } from "../../actions/FilmActions";
import { NextFilmsPage, PreviousFilmsPage } from "../../actions/ToolActions";
import { useState } from "react";
import { useEffect } from "react";

const FilmsPagination = () => {
  const //currentPage = useSelector((data) => data.tool.filmsPagination),
    minNumPage = 1,
    maxNumPage = 500,
    [currentPage, setPage] = useState(1);

  useEffect(() => {
    ReadFilms({ page: currentPage });
  }, [currentPage]);

  scroll(null, 0); //Scroll to top

  const ButtonPrevious =
    currentPage <= minNumPage ? (
      <div />
    ) : (
      <button
        onClick={() => {
          //PreviousFilmsPage();
          setPage(currentPage - 1);
        }}
      >
        Anterior
      </button>
    );

  const ButtonNext =
    currentPage >= maxNumPage ? (
      <div />
    ) : (
      <button
        onClick={() => {
          //NextFilmsPage();
          setPage(currentPage + 1);
        }}
      >
        Siguiente
      </button>
    );

  return (
    <div className="FilmsPagination">
      {ButtonPrevious}
      <span>{currentPage}</span>
      {ButtonNext}
    </div>
  );
};

export default FilmsPagination;
