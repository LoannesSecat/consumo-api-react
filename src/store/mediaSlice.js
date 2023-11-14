import MyFetch from "~/services/MyFetch";
import { TMDb } from "~/utils/Parameters";
import { getStore } from "~/utils/constants";

const initialState = {
  data: [],
  FILM_DETAILS: {},
  PERSON_DETAILS: {},
  SERIE_DETAILS: {},
  MEDIA_TYPE: "",
  SUCCESS: false,
  LOADING: false,
  ERROR: false,
  page: 1,
  totalPages: 1,
  SEARCH_TEXT: "",
}

const mediaSlice = (set) => ({
  ...initialState,

  changeStates: (params) => {
    set((prev) => ({ ...prev, ...params }));
  },

  resetMediaDetails: () => {
    set((prev) => ({ ...prev, FILM_DETAILS: {}, PERSON_DETAILS: {}, SERIE_DETAILS: {} }));
  },

  readMedia: async () => {
    const { SEARCH_TEXT, page } = getStore("media");
    const URL = SEARCH_TEXT.length
      ? `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.query}${SEARCH_TEXT}&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`
      : `${TMDb.url_v3}/trending/all/day?&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`
    const { data, response } = await MyFetch({ path: URL });

    if (response.ok) {
      set((prev) => ({ ...prev, data: data?.results, totalPages: data.total_pages }))
    }
  },

  mediaDetails: async (extra, mediaType) => {
    const { id } = extra;
    const TYPES = {
      movie: { url: TMDb.movie, state: "FILM_DETAILS" },
      tv: { url: TMDb.tv, state: "SERIE_DETAILS" },
      person: { url: TMDb.person, state: "PERSON_DETAILS" },
    };
    const URL = `${TMDb.url_v3}${TYPES[mediaType].url}${id}?${TMDb.language}`;

    const { data, response } = await MyFetch({ path: URL });

    if (response.ok) {
      set((prev) => ({
        ...prev,
        [TYPES[mediaType].state]: { ...extra, ...data },
      }));

      getStore("media").changeStates({ SUCCESS: true, LOADING: false });
    }
  },

  mediaType: (mediaType) => {
    set((prev) => ({ ...prev, MEDIA_TYPE: mediaType }));
  },

  changePage: (page) => {
    set((prev) => ({ ...prev, page: page || 1 }));
  },

  searchText: (text) => {
    set((prev) => ({ ...prev, SEARCH_TEXT: text || "" }));
  },

  totalPages: (numPages) => {
    set((prev) => ({ ...prev, totalPages: numPages }));
  },
})

export default mediaSlice