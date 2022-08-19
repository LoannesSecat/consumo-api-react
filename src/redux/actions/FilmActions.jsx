import Parameters from "../../services/Parameters";
import Soliciter from "../../services/Soliciter";
import db from "../../services/Mocks";
import ACTIONS from "../ActionsCreators/FilmTypes";
import Dispatch from "../../utils/UseDispatch";
import store from "../../utils/useStore";
import { NewPage, TotalPages } from "./ToolActions";

const { TMDb } = Parameters
let req = "";

export const ReadFilms = () => {
  const { FilmsMock } = db();
  const search_text = store({ reducer: "tool", value: "search_text" });
  const page = store({ reducer: "tool", value: "page" });
  const total_pages = store({ reducer: "tool", value: "total_pages" });
  const query = search_text === "" || search_text === " " ? "a" : search_text;
  req = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.api_key}&${TMDb.query}${query}&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`;

  Soliciter({
    request: req,
    mock: FilmsMock,
    action: ACTIONS.READ_FILMS,
  }).then((e) => {
    if (total_pages !== e.data.total_pages) {
      TotalPages(e.data.total_pages);
      NewPage();
    }

    Dispatch({
      type: e.type,
      payload: e.data.results,
    });
  });
};

export const FilmDetails = (extra_data) => {
  const { id } = extra_data;
  const { FilmDetailsMock } = db();
  req = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.api_key}&${TMDb.language}`;

  Soliciter({
    request: req,
    mock: FilmDetailsMock,
    action: ACTIONS.FILM_DETAILS,
  }).then((e) => {
    Dispatch({
      type: e.type,
      payload: { ...extra_data, ...e.data },
    });

    localStorage.setItem(e.type, JSON.stringify({ ...extra_data, ...e.data }));
  });
};

export const SerieDetails = (extra_data) => {
  const { id } = extra_data;
  const { SerieDetailsMock } = db();
  req = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.api_key}&${TMDb.language}`;

  console.log("FLAG 2")
  Soliciter({
    request: req,
    mock: SerieDetailsMock,
    action: ACTIONS.SERIE_DETAILS,
  }).then((e) => {
    console.log("FLAG 3")
    Dispatch({
      type: e.type,
      payload: { ...extra_data, ...e.data },
    });

    localStorage.setItem(e.type, JSON.stringify({ ...extra_data, ...e.data }));
  });
};

export const PersonDetails = (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.person}${id}?${TMDb.api_key}&${TMDb.language}`;

  Soliciter({ request: req, mock: {}, action: ACTIONS.PERSON_DETAILS }).then(
    (e) => {
      Dispatch({ type: e.type, payload: { ...extra_data, ...e.data } });

      localStorage.setItem(
        e.type,
        JSON.stringify({ ...extra_data, ...e.data })
      );
    }
  );
};

export const MediaType = (type_media) => {
  Dispatch({
    type: ACTIONS.MEDIA_TYPE,
    payload: type_media,
  });

  localStorage.setItem(ACTIONS.MEDIA_TYPE, type_media);
};
