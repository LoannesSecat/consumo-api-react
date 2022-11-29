import { useState } from "react";
import Header from "~/components/Header";
import Media from "~/components/Media";
import MediaPagination from "~/components/MediaPagination";
import MediaC from "~/superstate/Media";
import ToolC from "~/superstate/Tool";
import UserC from "~/superstate/User";
import styles from "~/utils/styles/home.module.scss";

const { newPage, searchText } = ToolC;
const { readMedia } = MediaC;

export default function Home() {
  const [timer, setTimer] = useState(null);
  const { SEARCH_TEXT } = ToolC.state.now();
  const { SESSION } = UserC.state.now();

  const Aux = (text) => {
    const AUX_TEXT = text;

    if (AUX_TEXT !== SEARCH_TEXT) newPage();
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
      <Media />
      <MediaPagination />
    </>
  );
}
