import { useEffect, useState } from "react";
import Header from "~/components/header";
import store from "~/store";
import { customTimeOut } from "~/utils/functions.js";
import styles from "./home.module.scss";
import MediaList from "./media-list";
import MediaPagination from "./media-pagination";

export default function Home() {
  const { filterText, changeSearchText, changePage } = store.media();
  const [text, setText] = useState(filterText);
  const { session } = store.user();

  useEffect(() => {
    if (filterText !== text) {
      if (text[text.length - 1] === " " && text[text.length - 2] === " ") {
        setText(text.slice(0, text.length - 1));
      }

      customTimeOut({
        fn: () => {
          changeSearchText(text.trim());
          changePage();
        },
        miliseconds: 500
      })
    }
  }, [text])

  return (
    <>
      <Header className={styles.header}>
        <input
          type="search"
          onChange={(e) => { setText(e.target.value); }}
          value={text}
          placeholder="Ej: Los guardianes de la galaxia"
          className={styles.search_input}
        />
      </Header>

      <MediaList />

      <MediaPagination />
    </>
  );
}
