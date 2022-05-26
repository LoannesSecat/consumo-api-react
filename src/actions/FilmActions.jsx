import Parameters from "../services/Parameters";
import Soliciter from "../services/Soliciter";
import db from "../services/Mocks";
import ACTIONS from "../utils/ActionsCreators/FilmTypes";
import useDispatch from "../hooks/useDispatch";
import useStore from "../hooks/useStore";
import { MaximumPages } from "../actions/ToolActions";

const TMDb = Parameters.TMDb;

export const ReadFilms = () => {
  let query = "a";

  const page = useStore({ reducer: "tool", value: "page" });
  const maxPage = useStore({ reducer: "tool", value: "maxPage" });
  const req = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.api_key}&${TMDb.query}${query}&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`;

  Soliciter({
    request: req,
    mock: db().Films,
    action: ACTIONS.READ_FILMS,
  }).then((e) => {
    if (maxPage !== e.data.total_pages) MaximumPages(e.data.total_pages);

    useDispatch({
      type: e.type,
      payload: e.data.results?.filter((el) => el.media_type !== "person"), //Excluye los datos con media_type igual a "person"
    });
  });
};

export const FilmDetails = (extraData) => {
  const { media_type, id } = extraData;
  const { SelectedFilm } = db();

  let req = "",
    myData = [];

  switch (media_type) {
    case "tv":
      req = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.api_key}&${TMDb.language}`;
      myData = SelectedFilm.tv;
      break;

    case "movie":
      req = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.api_key}&${TMDb.language}`;
      myData = SelectedFilm.movie;
      break;
  }

  Soliciter({
    request: req,
    mock: { ...myData, ...extraData },
    action: ACTIONS.FILM_DETAILS,
  }).then((e) => {
    useDispatch({
      type: e.type,
      payload: { ...extraData, ...e.data },
    });
  });
};
