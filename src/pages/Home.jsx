import { useState } from "react";
import { useSelector } from "react-redux";
import HandleLoading from "~/components/HandleLoading";
import Header from "~/components/Header";
import Media from "~/components/Media";
import MediaPagination from "~/components/MediaPagination";
import { ReadResources } from "~/redux/actions/MediaActions";
import { SearchText } from "~/redux/actions/ToolActions";
import "~/utils/styles/Home.scss";

export default function Home() {
  const searchText = useSelector((e) => e.tool.searchText);
  const resources = useSelector((e) => e.media.resources);
  const [timer, setTimer] = useState(null);

  const Aux = (text) => {
    const auxText = text;

    SearchText(auxText);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      ReadResources(newTimer);
    }, 500);
    setTimer(newTimer);
  };

  const HandleSearch = (value) => {
    if (value[value.length - 1] === " " && value[value.length - 2] === " ") {
      Aux(value.slice(0, -2));
    } else {
      Aux(value);
    }

    if (value === "") ReadResources();
  };

  return (
    <>
      <Header>
        <div>Inicio</div>
        <input
          type="text"
          onChange={(e) => { HandleSearch(e.target.value); }}
          value={searchText}
          placeholder="Ej: Los guardianes de la galaxia"
        />
      </Header>

      <>
        <HandleLoading data={resources} Component={Media} />
        <MediaPagination />
      </>
    </>
  );
}
