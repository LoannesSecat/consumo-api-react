import Requester from "~/services/Requester";
import MyDispatch from "~/utils/MyDispatch";
import MyStore from "~/utils/MyStore";
import Parameters from "~/utils/Parameters";
import FilmTypes from "../ActionsCreators/FilmTypes";
import { NewPage, TotalPages } from "./ToolActions";

const { TMDb } = Parameters;
let req = "";

export const ReadResources = async () => {
  const SEARCH_TEXT = MyStore({ reducer: "tool", value: "searchText" });
  const PAGE = MyStore({ reducer: "tool", value: "page" });
  const TOTAL_PAGES = MyStore({ reducer: "tool", value: "totalPages" });
  const QUERY = SEARCH_TEXT === "" || SEARCH_TEXT === " " ? "a" : SEARCH_TEXT;
  req = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.key}&${TMDb.query}${QUERY}&${TMDb.page}${PAGE}&${TMDb.language}&${TMDb.include_adult}`;

  const RESULT = await Requester({ request: req, action: FilmTypes.READ_RESOURCES });

  if (TOTAL_PAGES !== RESULT?.value?.total_pages) {
    TotalPages(RESULT?.value?.total_pages);
    NewPage();
  }

  MyDispatch({
    type: RESULT?.type,
    payload: RESULT?.value?.results,
  });
};

export const FilmDetails = async (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.key}&${TMDb.language}`;

  const RESULT = await Requester({ request: req, action: FilmTypes.FILM_DETAILS });

  MyDispatch({
    type: RESULT.type,
    payload: { ...extra_data, ...RESULT.value },
  });
};

export const SerieDetails = async (extra_data) => {
  const { id } = extra_data;
  req = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.key}&${TMDb.language}`;

  const RESULT = await Requester({ request: req, action: FilmTypes.SERIE_DETAILS });

  MyDispatch({
    type: RESULT.type,
    payload: { ...extra_data, ...RESULT.value },
  });
};

export const PersonDetails = async (extraData) => {
  const { id } = extraData;
  req = `${TMDb.url_v3}${TMDb.person}${id}?${TMDb.key}&${TMDb.language}`;

  const RESULT = await Requester({ request: req, action: FilmTypes.PERSON_DETAILS });

  MyDispatch({
    type: RESULT.type,
    payload: { ...extraData, ...RESULT.value },
  });
};

export const MediaType = (typeMedia) => {
  MyDispatch({
    type: FilmTypes.MEDIA_TYPE,
    payload: typeMedia,
  });
};
