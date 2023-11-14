import styles from "~/utils/styles/media-pagination.module.scss";

export default function MediaPagination({ page, totalPages, changePage }) {

  const BUTTON_PREVIOUS = page <= 1 ? (
    <div className={styles.aux_previous} />
  ) : (
    <button
      onClick={() => {
        changePage(page - 1);
        scrollTo(0, 0);
      }}
      className={styles.previous_button}
      type="button"
    >
      Anterior
    </button>
  );

  const BUTTON_NEXT = page >= totalPages ? (
    <div className={styles.aux_next} />
  ) : (
    <button
      onClick={() => {
        changePage(page + 1);
        scrollTo(0, 0);
      }}
      className={styles.next_button}
      type="button"
    >
      Siguiente
    </button>
  );

  if (totalPages > 0) {
    return (
      <footer className={styles.media_pagination}>
        {BUTTON_PREVIOUS}
        <span>
          {page}
          /
          {totalPages}
        </span>
        {BUTTON_NEXT}
      </footer>
    );
  }

  return null;
}
