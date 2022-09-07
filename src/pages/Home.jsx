import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HandleLoading from "~/components/HandleLoading";
import Header from "~/components/Header";
import Media from "~/components/Media";
import MediaPagination from "~/components/MediaPagination";
import { ReadFilms } from "~/redux/actions/FilmActions";
import { SearchText } from "~/redux/actions/ToolActions";
import "~/utils/styles/Home.scss";

export default function Home() {
  const searchText = useSelector((e) => e.tool.searchText);
  const films = useSelector((e) => e.film.films);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    ReadFilms();
  }, []);

  const Aux = (text) => {
    const auxText = text;

    SearchText(auxText);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      ReadFilms(newTimer);
    }, 500);
    setTimer(newTimer);
  };

  const HandleSearch = (value) => {
    if (value[value.length - 1] === " " && value[value.length - 2] === " ") {
      Aux(value.slice(0, -2));
    } else {
      Aux(value);
    }

    if (value === "") ReadFilms();
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
        <HandleLoading data={films} Component={Media} />
        <MediaPagination />
      </>
    </>
  );
}
