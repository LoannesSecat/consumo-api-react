import Film from "~/components/Film";
import Header from "~/components/Header";
import "~/utils/styles/Home.scss";
import Empty from "~/components/Empty";
import { useSelector } from "react-redux";
import Loading from "~/components/Loading";
import { ReadFilms } from "~/redux/actions/FilmActions";
import { useEffect } from "react";
import FilmsPagination from "~/components/FilmsPagination";
import { SearchText } from "~/redux/actions/ToolActions";

export default function Home() {
  const data_films = useSelector((e) => e.film.films);
  const text = useSelector((e) => e.tool.search_text);

  console.log("Hola prueba!")

  useEffect(() => {
    ReadFilms()
  }, [text]);

  const CompFilms = () => {
    if (data_films === "loading") return <Loading />;

    if (data_films?.length) {
      return (
        <div className="Films">
          {data_films?.map((e, i) => (
            <Film data={e} key={i} />
          ))}
        </div>
      );
    }

    return <Empty />;
  };

  const HandleSearch = (value) => {
    if (value[value.length - 1] === " " && value[value.length - 2] === " ") {
      SearchText(value.slice(0, -1));
    } else {
      SearchText(value);
    }

    if (value === "") SearchText();
  };

  return (
    <>
      <Header>
        <div>Inicio</div>
        <input
          type="text"
          onChange={(e) => HandleSearch(e.target.value)}
          value={text}
          placeholder="Ej: Los guardianes de la galaxia"
        />
      </Header>

      <>
        <CompFilms />
        <FilmsPagination />
      </>
    </>
  );
}
