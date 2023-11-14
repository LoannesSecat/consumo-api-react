import { useState } from "react";
import Header from "~/components/Header";
import Media from "~/components/Media";
import MediaPagination from "~/components/MediaPagination";
import store from "~/store";
import styles from "~/utils/styles/home.module.scss";

export default function Home() {
  const [timer, setTimer] = useState(null);
  const { SEARCH_TEXT, readMedia, searchText, data, page, totalPages, changePage } = store.media();
  const { SESSION } = store.user();

  const Aux = (text) => {
    const AUX_TEXT = text;

    if (AUX_TEXT !== SEARCH_TEXT) changePage();
    searchText(AUX_TEXT);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      readMedia();
    }, 500);

    setTimer(newTimer);
  };

  const HandleSearch = (value) => {
    if (value[value.length - 1] === " " && value[value.length - 2] === " ") {
      Aux(value.trim());
    } else {
      Aux(value);
    }
  };

  return (
    <>
      <Header className={SESSION ? styles.in_session_header : styles.header}>
        <input
          type="search"
          onChange={(e) => { HandleSearch(e.target.value); }}
          value={SEARCH_TEXT}
          placeholder="Ej: Los guardianes de la galaxia"
          className={styles.search_input}
        />
      </Header>
      <Media {...{ data, page, readMedia }} />
      <MediaPagination {...{ page, totalPages, changePage }} />
    </>
  );
}
