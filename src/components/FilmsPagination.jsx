import "../utils/styles/FilmsPagination.scss";
import { NextFilmsPage, PreviousFilmsPage } from "../redux/actions/ToolActions";
import { useSelector } from "react-redux";

export default function FilmsPagination() {
  const { page, minPage, totalPages } = useSelector((e) => e.tool);

  const ButtonPrevious =
    page <= minPage ? (
      <div />
    ) : (
      <button onClick={() => PreviousFilmsPage()}>Anterior</button>
    );

  const ButtonNext =
    page >= totalPages ? (
      <div />
    ) : (
      <button onClick={() => NextFilmsPage()}>Siguiente</button>
    );

  return (
    <div className="FilmsPagination">
      {ButtonPrevious}
      <span>
        {page} / {totalPages}
      </span>
      {ButtonNext}
    </div>
  );
}
