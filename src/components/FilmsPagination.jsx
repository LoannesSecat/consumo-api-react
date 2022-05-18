import "@/utils/styles/FilmsPagination.scss";
import { ReadFilms } from "@/actions/FilmActions";
import { NextFilmsPage, PreviousFilmsPage } from "@/actions/ToolActions";
import { useSelector } from "react-redux";

const FilmsPagination = () => {
  scroll(null, 0); //Scroll to top

  const currentPage = useSelector((e) => e.tool.page);
  const minNumPage = useSelector((e) => e.tool.minPage);
  const maxNumPage = useSelector((e) => e.tool.maxPage);

  const ButtonPrevious =
    currentPage <= minNumPage ? (
      <div />
    ) : (
      <button
        onClick={() => {
          PreviousFilmsPage();
          ReadFilms();
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
          NextFilmsPage();
          ReadFilms();
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
