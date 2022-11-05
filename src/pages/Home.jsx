import { useState } from "react";
import { useSelector } from "react-redux";
import HandleLoading from "~/components/HandleLoading";
import Header from "~/components/Header";
import Media from "~/components/Media";
import MediaPagination from "~/components/MediaPagination";
import { ReadResources } from "~/services/MediaServices";
import { NewPage, SearchText } from "~/services/ToolServices";
import "~/utils/styles/Home.scss";

export default function Home() {
  const { SEARCH_TEXT } = useSelector((e) => e.tool);
  const [timer, setTimer] = useState(null);

  const Aux = (text) => {
    const AUX_TEXT = text;

    if (AUX_TEXT !== SEARCH_TEXT) NewPage();
    SearchText(AUX_TEXT);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      ReadResources();
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
      <Header>
        <input
          type="search"
          onChange={(e) => { HandleSearch(e.target.value); }}
          value={SEARCH_TEXT}
          placeholder="Ej: Los guardianes de la galaxia"
          className="search-input"
        />
      </Header>
      <HandleLoading Component={Media} />
      <MediaPagination />
    </>
  );
}
