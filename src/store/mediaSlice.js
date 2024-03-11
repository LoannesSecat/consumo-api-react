import MyFetch from "~/services/my-fetch";
import { TMDB } from "~/utils/constants.js";
import { getStore } from "~/utils/functions.js";

const {
  url_v3, multi_search, query, language, include_adult,
} = TMDB;
const initialState = {
  data: [],
  details: {},
  mediaSelectedType: "",
  isSuccess: false,
  isLoading: false,
  isError: false,
  isDone: false,
  page: 1,
  totalPages: 1,
  filterText: "",
  totalResults: 0,
  auxMediaDetails: null,
};

const mediaSlice = (set) => ({
  ...initialState,

  readMedia: async () => {
    const { filterText, page } = getStore("media");

    set((state) => ({
      ...state, isLoading: true, data: [], isDone: false,
    }));

    const url = filterText.length
      ? `${url_v3}${multi_search}?${query}${filterText}&${TMDB.page}${page}&${language}&${include_adult}`
      : `${url_v3}/trending/all/day?&${TMDB.page}${page}&${language}&${include_adult}`;
    const { data, response } = await MyFetch({ path: url });

    if (response.ok) {
      const { results, total_pages, total_results } = data;

      set((prev) => ({
        ...prev, data: results, totalPages: total_pages, totalResults: total_results,
      }));
    }

    set((state) => ({
      ...state, isLoading: false, isDone: true, isSuccess: true,
    }));
  },

  readMediaDetails: async ({ id, media_type }) => {
    if (!id || !media_type) {
      return;
    }

    set((state) => ({
      ...state, isLoading: true, mediaSelectedType: media_type, details: {}, isDone: false,
    }));

    const URL = `${url_v3}/${media_type}/${id}?${language}`;
    const { data, response } = await MyFetch({ path: URL });

    if (response.ok) {
      set((state) => ({
        ...state,
        details: data,
        isSuccess: true,
        isLoading: false,
        isDone: true,
      }));
    }
  },

  changePage: (page = 1) => {
    set((prev) => ({ ...prev, page }));
  },

  changeSearchText: (text = "") => {
    set((prev) => ({ ...prev, filterText: text || "" }));
  },

  changeAuxMediaDetails: (data) => {
    set((state) => ({ ...state, auxMediaDetails: data }));
  },
});

export default mediaSlice;
