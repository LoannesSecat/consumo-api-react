import "~/utils/styles/FilmsPagination.scss";
import { NextFilmsPage, PreviousFilmsPage } from "~/redux/actions/ToolActions";
import { useSelector } from "react-redux";

export default function FilmsPagination() {
  const { page, min_page, total_pages } = useSelector((e) => e.tool);

  const button_previous =
    page <= min_page ? (
      <div />
    ) : (
      <button onClick={() => PreviousFilmsPage()}>Anterior</button>
    );

  const button_next =
    page >= total_pages ? (
      <div />
    ) : (
      <button onClick={() => NextFilmsPage()}>Siguiente</button>
    );


  return total_pages === 0 ?
    null :
    <>
      <div className="FilmsPagination">
        {button_previous}
        <span>
          {page} / {total_pages}
        </span>
        {button_next}
      </div>
    </>

}
