import store from "~/store";
import { TMDB } from "~/utils/constants";
import { getStore } from "~/utils/functions";
import MyFetch from "./my-fetch";

const { setState } = store.media;
const { url_v3, multi_search, query, language, include_adult } = TMDB;

export const readMedia = async () => {
  const { filterText, page } = getStore("media");

  setState((state) => ({ ...state, isLoading: true, data: [], isDone: false }));

  const url = filterText.length
    ? `${url_v3}${multi_search}?${query}${filterText}&${TMDB.page}${page}&${language}&${include_adult}`
    : `${url_v3}/trending/all/day?&${TMDB.page}${page}&${language}&${include_adult}`;
  const { data, response } = await MyFetch({ path: url });

  if (response.ok) {
    const { results, total_pages, total_results } = data;

    setState((prev) => ({ ...prev, data: results, totalPages: total_pages, totalResults: total_results }));
  }

  setState((state) => ({ ...state, isLoading: false, isDone: true, isSuccess: true }));
}

export const readMediaDetails = async ({ id, media_type: mediaType }) => {
  if (!id || !mediaType) {
    return;
  }

  setState((state) => ({
    ...state, isLoading: true, mediaSelectedType: mediaType, details: {}, isDone: false,
  }));

  const url = `${url_v3}/${mediaType}/${id}?${language}`;
  const { data, response } = await MyFetch({ path: url });

  if (response.ok) {
    setState((state) => ({
      ...state,
      details: data,
      isSuccess: true,
      isLoading: false,
      isDone: true,
    }));
  }
}