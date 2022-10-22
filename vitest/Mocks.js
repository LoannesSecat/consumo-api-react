export const MediaReducer = {
  RESOURCES: {},
  FILM_DETAILS: {},
  PERSON_DETAILS: {},
  SERIE_DETAILS: {},
  TYPE_MEDIA: "",
};

export const ToolReducer = {
  PAGE: 1,
  MIN_PAGE: 1,
  TOTAL_PAGES: 1,
  SEARCH_TEXT: "",
};

export const UserReducer = {
  USER_DATA: {},
  TOKEN: {},
  SESSION: false,
};

export const Reducers = {
  media: MediaReducer,
  user: UserReducer,
  tool: ToolReducer,
};
