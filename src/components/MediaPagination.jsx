import { useSelector } from "react-redux";
import { NextFilmsPage, PreviousFilmsPage } from "~/services/ToolServices";
import "~/utils/styles/MediaPagination.scss";

export default function MediaPagination() {
  const { PAGE, MIN_PAGE, TOTAL_PAGES } = useSelector((e) => e.tool);

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

  if (TOTAL_PAGES > 0) {
    return (
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

  return null;
}
