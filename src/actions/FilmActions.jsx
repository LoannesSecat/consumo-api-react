import Parameters from "@/services/Parameters";
import Soliciter from "@/services/Soliciter";
import db from "@/services/db";
import RequestMode from "@/services/RequestMode";
import ACTIONS from "@/utils/ActionsCreators/FilmTypes";
import useDispatch from "@/hooks/useDispatch";
import useStore from "@/hooks/useStore";
import { MaximumPages } from "@/actions/ToolActions";

const TMDb = Parameters.TMDb;

export const ReadFilms = () => {
  const page = useStore({ reducer: "tool", value: "page" });
  const maxPage = useStore({ reducer: "tool", value: "maxPage" });
  let query = "a";
  const req = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.api_key}&${TMDb.query}${query}&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`;
  const filmsLength = Object.keys(db.Films).length;

  if (RequestMode === "test") {
    if (maxPage !== filmsLength) {
      MaximumPages(filmsLength);
    }

    useDispatch({
      type: ACTIONS.READ_FILMS,
      payload: db.Films[`page_${page}`],
    });
  }

  if (RequestMode === "real") {
    Soliciter(req).then((e) => {
      if (maxPage !== e.total_pages) {
        MaximumPages(e.total_pages);
      }

      useDispatch({
        type: ACTIONS.READ_FILMS,
        payload: e.results.filter((e) => e.media_type !== "person"), //Excluye los datos con media_type igual a "person"
      });
    });
  }
};

export const FilmDetails = (extraData) => {
  const { media_type, id } = extraData;

  let req = "",
    myData = {};

  switch (media_type) {
    case "tv":
      req = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.api_key}&${TMDb.language}`;
      myData = db.SelectedFilm.tv;
      break;

    case "movie":
      req = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.api_key}&${TMDb.language}`;
      myData = db.SelectedFilm.movie;
      break;
  }

  if (RequestMode === "test") {
    useDispatch({
      type: ACTIONS.FILM_DETAILS,
      payload: { ...myData, ...extraData },
    });
  }

  if (RequestMode === "real") {
    Soliciter(req).then((e) => {
      useDispatch({
        type: ACTIONS.FILM_DETAILS,
        payload: { ...e, ...extraData },
      });
    });
  }
};

export const ReadGender = async ({ id }) => {};
