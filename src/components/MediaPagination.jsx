import { useSelector } from "react-redux";
import { NextFilmsPage, PreviousFilmsPage } from "~/services/ToolServices";
import styles from "~/utils/styles/media-pagination.module.scss";

export default function MediaPagination() {
  const { PAGE, MIN_PAGE, TOTAL_PAGES } = useSelector((e) => e.tool);

  const BUTTON_PREVIOUS = PAGE <= MIN_PAGE ? (
    <div className={styles.aux_previous} />
  ) : (
    <button onClick={() => PreviousFilmsPage()} className={styles.previous_button}>Anterior</button>
  );

  const BUTTON_NEXT = PAGE >= TOTAL_PAGES ? (
    <div className={styles.aux_next} />
  ) : (
    <button onClick={() => NextFilmsPage()} className={styles.next_button}>Siguiente</button>
  );

  if (TOTAL_PAGES > 0) {
    return (
      <footer className={styles.media_pagination}>
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
