import { useEffect, useRef, useState } from "react";
import store from "~/store";
import { customTimeOut } from "~/utils/functions";
import styles from "./media-pagination.module.scss";

export default function MediaPagination() {
  const { page, totalResults, totalPages, changePage, isLoading } = store.media();
  const [localPage, setLocalPage] = useState(page);
  const prevButtonRef = useRef();
  const nextButtonRef = useRef();
  const inputPageRef = useRef();

  useEffect(() => {
    setLocalPage(page);

    if (prevButtonRef.current && nextButtonRef.current) {
      prevButtonRef.current.disabled = page <= 1 ? true : false;
      nextButtonRef.current.disabled = page >= totalPages ? true : false;
    }
  }, [page, totalResults])

  useEffect(() => {
    if (inputPageRef.current) {
      inputPageRef.current.disabled = isLoading ? true : false;
    }
  }, [isLoading, totalResults])

  if (totalResults) {
    return (
      <footer className={styles.media_pagination}>
        <button
          onClick={() => {
            changePage(page - 1);
          }}
          className={styles.previous_button}
          type="button"
          ref={prevButtonRef}
        >
          Anterior
        </button>

        <span>
          Página

          <input
            onChange={(evt) => {
              const { target } = evt;
              let value = Number(target?.value);

              if (value < 1) {
                target.setCustomValidity("El valor debe ser mayor o igual a 1");
                target.reportValidity();
                value = 1;

                return;
              }

              if (value > totalPages) {
                target.setCustomValidity(`El valor debe ser menor o igual a ${totalPages}`);
                target.reportValidity();
                value = totalPages;

                return;
              }

              customTimeOut({
                fn: () => {
                  changePage(value);
                },
                miliseconds: 500
              })
            }}
            type="number"
            value={localPage}
            ref={inputPageRef}
          />

          de <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() => {
            changePage(page + 1);
          }}
          className={styles.next_button}
          type="button"
          ref={nextButtonRef}
        >
          Siguiente
        </button>
      </footer>
    );
  }

  return null;
}
