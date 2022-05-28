import "../utils/styles/FilmsPagination.scss";
import { NextFilmsPage, PreviousFilmsPage } from "../redux/actions/ToolActions";
import { useSelector } from "react-redux";

export default function FilmsPagination() {
  scroll(null, 0); //Scroll to top

  const currentPage = useSelector((e) => e.tool.page);
  const minNumPage = useSelector((e) => e.tool.minPage);
  const maxNumPage = useSelector((e) => e.tool.maxPage);

  const ButtonPrevious =
    currentPage <= minNumPage ? (
      <div />
    ) : (
      <button onClick={() => PreviousFilmsPage()}>Anterior</button>
    );

  const ButtonNext =
    currentPage >= maxNumPage ? (
      <div />
    ) : (
      <button onClick={() => NextFilmsPage()}>Siguiente</button>
    );

  return (
    <div className="FilmsPagination">
      {ButtonPrevious}
      <span>{currentPage}</span>
      {ButtonNext}
    </div>
  );
}
