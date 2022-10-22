import FilmActions from "../actions/MediaActions.json";

const initialState = {
  RESOURCES: {},
  FILM_DETAILS: {},
  PERSON_DETAILS: {},
  SERIE_DETAILS: {},
  TYPE_MEDIA: "",
};

export default function MediaReducer(store = initialState, action) {
  switch (action.type) {
    case FilmActions.READ_RESOURCES:
      return { ...store, RESOURCES: action.payload };
    case FilmActions.FILM_DETAILS:
      return { ...store, FILM_DETAILS: action.payload };
    case FilmActions.PERSON_DETAILS:
      return { ...store, PERSON_DETAILS: action.payload };
    case FilmActions.SERIE_DETAILS:
      return { ...store, SERIE_DETAILS: action.payload };
    case FilmActions.MEDIA_TYPE:
      return { ...store, TYPE_MEDIA: action.payload };

    default:
      return store;
  }
}
