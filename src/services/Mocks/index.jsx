import useStore from "~/utils/useStore";
import Films from "./FilmsMock";
import FilmDetailsMock from "./FilmDetailsMock";
import SerieDetailsMock from "./SerieDetailsMock";
import PersonDetailsMock from "./PersonDetailsMock";

export default function Mocks() {
  const page = useStore({ reducer: "tool", value: "page" });

  return {
    FilmDetailsMock,
    SerieDetailsMock,
    PersonDetailsMock,
    FilmsMock: {
      total_pages: Object.keys(Films).length,
      results: Films[page - 1],
    },
  };
}
