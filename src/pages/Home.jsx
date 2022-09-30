import { useState } from "react";
import { useSelector } from "react-redux";
import XMark from "~/assets/icons/XMark";
import HandleLoading from "~/components/HandleLoading";
import Header from "~/components/Header";
import Media from "~/components/Media";
import MediaPagination from "~/components/MediaPagination";
import { ReadResources } from "~/redux/actions/MediaActions";
import { SearchText } from "~/redux/actions/ToolActions";
import "~/utils/styles/Home.scss";

export default function Home() {
  const SEARCH_TEXT = useSelector((e) => e.tool.searchText);
  const [timer, setTimer] = useState(null);

  const Aux = (text) => {
    const AUX_TEXT = text;

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

  const DeleteTextInput = () => {
    Aux("");
  };

  return (
    <>
      <Header>
        <div>
          <input
            type="text"
            onChange={(e) => { HandleSearch(e.target.value); }}
            value={SEARCH_TEXT}
            placeholder="Ej: Los guardianes de la galaxia"
            className="search-input"
          />

          {SEARCH_TEXT.length
            ? (
              <button
                onClick={DeleteTextInput}
                className="delete-text-input"
              >
                <XMark />
              </button>
            )
            : null}
        </div>
      </Header>

      <>
        <HandleLoading Component={Media} />
        <MediaPagination />
      </>
    </>
  );
}
