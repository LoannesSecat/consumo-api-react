import "@/utils/styles/FilmsPagination.scss";
import { NextFilmsPage, PreviousFilmsPage } from "@/actions/ToolActions";
import useStore from "@/hooks/useStore";

const FilmsPagination = () => {
  scroll(null, 0); //Scroll to top

  const currentPage = useStore({ reducer: "tool", value: "page" });
  const minNumPage = useStore({ reducer: "tool", value: "minPage" });
  const maxNumPage = useStore({ reducer: "tool", value: "maxPage" });

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
};

export default FilmsPagination;
