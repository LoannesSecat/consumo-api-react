import { useSuperState } from "@superstate/react";
import ToolC from "~/superstate/Tool";
import styles from "~/utils/styles/media-pagination.module.scss";

const { nextMediaPage, previousMediaPage } = ToolC;

export default function MediaPagination() {
  const { PAGE, MIN_PAGE, TOTAL_PAGES } = ToolC.state.now();
  useSuperState(ToolC.state);

  const BUTTON_PREVIOUS = PAGE <= MIN_PAGE ? (
    <div className={styles.aux_previous} />
  ) : (
    <button
      onClick={() => {
        previousMediaPage();
        scrollTo(0, 0);
      }}
      className={styles.previous_button}
      type="button"
    >
      Anterior
    </button>
  );

  const BUTTON_NEXT = PAGE >= TOTAL_PAGES ? (
    <div className={styles.aux_next} />
  ) : (
    <button
      onClick={() => {
        nextMediaPage();
        scrollTo(0, 0);
      }}
      className={styles.next_button}
      type="button"
    >
      Siguiente
    </button>
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
