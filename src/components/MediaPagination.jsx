import { useSelector } from "react-redux";
import { NextFilmsPage, PreviousFilmsPage } from "~/redux/actions/ToolActions";
import "~/utils/styles/MediaPagination.scss";

export default function MediaPagination() {
  const PAGE = useSelector((e) => e.tool.page);
  const MIN_PAGE = useSelector((e) => e.tool.minPage);
  const TOTAL_PAGES = useSelector((e) => e.tool.totalPages);

  const BUTTON_PREVIOUS = PAGE <= MIN_PAGE ? (
    <div className="aux-previous" />
  ) : (
    <button onClick={() => PreviousFilmsPage()} className="previous-button">Anterior</button>
  );

  const BUTTON_NEXT = PAGE >= TOTAL_PAGES ? (
    <div className="aux-next" />
  ) : (
    <button onClick={() => NextFilmsPage()} className="next-button">Siguiente</button>
  );

  return TOTAL_PAGES === 0
    ? null
    : (
      <footer className="media-pagination">
        {BUTTON_PREVIOUS}
        <span>
          {PAGE}
          /
          {TOTAL_PAGES}
        </span>
        {BUTTON_NEXT}
      </footer>
    );
}
