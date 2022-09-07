import { useSelector } from "react-redux";
import { NextFilmsPage, PreviousFilmsPage } from "~/redux/actions/ToolActions";
import "~/utils/styles/MediaPagination.scss";

export default function MediaPagination() {
  const page = useSelector((e) => e.tool.page);
  const minPage = useSelector((e) => e.tool.minPage);
  const totalPages = useSelector((e) => e.tool.totalPages);

  const buttonPrevious = page <= minPage ? (
    <div />
  ) : (
    <button onClick={() => PreviousFilmsPage()}>Anterior</button>
  );

  const buttonNext = page >= totalPages ? (
    <div />
  ) : (
    <button onClick={() => NextFilmsPage()}>Siguiente</button>
  );

  return totalPages === 0
    ? null
    : (
      <div className="FilmsPagination">
        {buttonPrevious}
        <span>
          {page}
          /
          {totalPages}
        </span>
        {buttonNext}
      </div>
    );
}
