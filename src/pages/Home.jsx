import Header from "~/components/Header";
import MediaPagination from "~/components/MediaPagination";
import Media from "~/components/Media";
import "~/utils/styles/Home.scss";
import { useSelector } from "react-redux";
import { ReadFilms } from "~/redux/actions/FilmActions";
import { useEffect } from "react";
import { SearchText } from "~/redux/actions/ToolActions";
import { useState } from "react";

export default function Home() {
  const { search_text } = useSelector((e) => e.tool);
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    ReadFilms()
  }, []);

  const HandleSearch = (value) => {
    if (value[value.length - 1] === " " && value[value.length - 2] === " ") {
      Aux(value.slice(0, -2))
    } else {
      Aux(value)
    }

    if (value === "") ReadFilms();
  };

  const Aux = (text) => {
    let aux_text = text

    SearchText(aux_text);

    clearTimeout(timer)
    const new_timer = setTimeout(() => {
      ReadFilms(aux_text);
    }, 500)
    setTimer(new_timer)
  }

  return (
    <>
      <Header>
        <div>Inicio</div>
        <input
          type="text"
          onChange={(e) => { HandleSearch(e.target.value) }}
          value={search_text}
          placeholder="Ej: Los guardianes de la galaxia"
        />
      </Header>

      <>
        <Media />
        <MediaPagination />
      </>
    </>
  );
}
