import Requester from "~/services/Requester";
import Dispatch from "~/utils/MyDispatch";
import store from "~/utils/MyStore";
import Parameters from "~/utils/Parameters";
import ACTIONS from "../ActionsCreators/FilmTypes";
import { NewPage, TotalPages } from "./ToolActions";

const { TMDb } = Parameters;
let req = "";

export const ReadResources = async () => {
  const searchText = store({ reducer: "tool", value: "searchText" });
  const page = store({ reducer: "tool", value: "page" });
  const totalPages = store({ reducer: "tool", value: "totalPages" });
  const query = searchText === "" || searchText === " " ? "a" : searchText;
  req = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.api_key}&${TMDb.query}${query}&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`;

  const result = await Requester({ request: req, action: ACTIONS.READ_RESOURCES });

  if (totalPages !== result?.value?.total_pages) {
    TotalPages(result?.value?.total_pages);
    NewPage();
  }

  Dispatch({
    type: result?.type,
    payload: result?.value?.results,
  });
};

export const FilmDetails = async (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.api_key}&${TMDb.language}`;

  const result = await Requester({ request: req, action: ACTIONS.FILM_DETAILS });

  Dispatch({
    type: result.type,
    payload: { ...extra_data, ...result.value },
  });
};

export const SerieDetails = async (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.api_key}&${TMDb.language}`;

  const result = await Requester({ request: req, action: ACTIONS.SERIE_DETAILS });

  Dispatch({
    type: result.type,
    payload: { ...extra_data, ...result.value },
  });
};

export const PersonDetails = async (extraData) => {
  const { id } = extraData;
  req = `${TMDb.url_v3}${TMDb.person}${id}?${TMDb.api_key}&${TMDb.language}`;

  const result = await Requester({ request: req, action: ACTIONS.PERSON_DETAILS });

  Dispatch({
    type: result.type,
    payload: { ...extraData, ...result.value },
  });
};

export const MediaType = (typeMedia) => {
  Dispatch({
    type: ACTIONS.MEDIA_TYPE,
    payload: typeMedia,
  });
};
