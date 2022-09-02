import Parameters from "~/services/Parameters";
import Requester from "~/services/Requester";
import db from "~/services/Mocks";
import ACTIONS from "../ActionsCreators/FilmTypes";
import Dispatch from "~/utils/MyDispatch";
import store from "~/utils/MyStore";
import { NewPage, TotalPages } from "./ToolActions";

const { TMDb } = Parameters
const { FilmsMock, FilmDetailsMock, SerieDetailsMock, PersonDetailsMock } = db()
let req = "";

export const ReadFilms = async () => {
  const search_text = store({ reducer: "tool", value: "search_text" });
  const page = store({ reducer: "tool", value: "page" });
  const total_pages = store({ reducer: "tool", value: "total_pages" });
  const query = search_text === "" || search_text === " " ? "a" : search_text;
  req = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.api_key}&${TMDb.query}${query}&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`;

  const result = await Requester({ request: req, mock: FilmsMock, action: ACTIONS.READ_FILMS })

  if (total_pages !== result.value.total_pages) {
    TotalPages(result.value.total_pages);
    NewPage();
  }

  Dispatch({
    type: result.type,
    payload: result.value.results,
  });
};

export const FilmDetails = async (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.api_key}&${TMDb.language}`;

  const result = await Requester({ request: req, mock: FilmDetailsMock, action: ACTIONS.FILM_DETAILS })

  Dispatch({
    type: result.type,
    payload: { ...extra_data, ...result.value },
  });

  localStorage.setItem(result.type, JSON.stringify({ ...extra_data, ...result.value }));
};

export const SerieDetails = async (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.api_key}&${TMDb.language}`;

  const result = await Requester({ request: req, mock: SerieDetailsMock, action: ACTIONS.SERIE_DETAILS })

  Dispatch({
    type: result.type,
    payload: { ...extra_data, ...result.value },
  });

  localStorage.setItem(result.type, JSON.stringify({ ...extra_data, ...result.value }));
};

export const PersonDetails = async (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.person}${id}?${TMDb.api_key}&${TMDb.language}`;

  const result = await Requester({ request: req, mock: PersonDetailsMock, action: ACTIONS.PERSON_DETAILS })

  Dispatch({
    type: result.type,
    payload: { ...extra_data, ...result.value }
  });

  localStorage.setItem(
    result.type,
    JSON.stringify({ ...extra_data, ...result.value })
  );
};

export const MediaType = (type_media) => {
  Dispatch({
    type: ACTIONS.MEDIA_TYPE,
    payload: type_media,
  });

  localStorage.setItem(ACTIONS.MEDIA_TYPE, type_media);
};
