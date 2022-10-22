import MyDispatch from "~/redux/selectors/MyDispatch";
import MyStore from "~/redux/selectors/MyStore";
import Requester from "~/services/Requester";
import Parameters from "~/utils/Parameters";
import FilmActions from "../redux/actions/MediaActions.json";
import { NewPage, TotalPages } from "./ToolServices";

const { TMDb } = Parameters;

export async function ReadResources() {
  const { SEARCH_TEXT, PAGE, TOTAL_PAGES } = MyStore({ reducer: "tool" });
  const QUERY = SEARCH_TEXT === "" || SEARCH_TEXT === " " ? "a" : SEARCH_TEXT;
  const URL = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.key}&${TMDb.query}${QUERY}&${TMDb.page}${PAGE}&${TMDb.language}&${TMDb.include_adult}`;

  const RESULT = await Requester({ request: URL, action: FilmActions.READ_RESOURCES });

  if (TOTAL_PAGES !== RESULT?.value?.total_pages) {
    TotalPages(RESULT?.value?.total_pages);
    NewPage();
  }

  MyDispatch({
    type: RESULT?.type,
    payload: RESULT?.value?.results,
  });
}

export async function FilmDetails(extra_data) {
  const { id } = extra_data;
  const URL = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.key}&${TMDb.language}`;

  const RESULT = await Requester({ request: URL, action: FilmActions.FILM_DETAILS });

  MyDispatch({
    type: RESULT.type,
    payload: { ...extra_data, ...RESULT.value },
  });
}

export async function SerieDetails(extra_data) {
  const { id } = extra_data;
  const URL = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.key}&${TMDb.language}`;

  const RESULT = await Requester({ request: URL, action: FilmActions.SERIE_DETAILS });

  MyDispatch({
    type: RESULT.type,
    payload: { ...extra_data, ...RESULT.value },
  });
}

export async function PersonDetails(extraData) {
  const { id } = extraData;
  const URL = `${TMDb.url_v3}${TMDb.person}${id}?${TMDb.key}&${TMDb.language}`;

  const RESULT = await Requester({ request: URL, action: FilmActions.PERSON_DETAILS });

  MyDispatch({
    type: RESULT.type,
    payload: { ...extraData, ...RESULT.value },
  });
}

export function MediaType(typeMedia) {
  MyDispatch({
    type: FilmActions.MEDIA_TYPE,
    payload: typeMedia,
  });
}
