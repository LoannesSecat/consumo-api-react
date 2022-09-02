import ACTIONS from "../ActionsCreators/FilmTypes";

const initialState = {
  films: [],
  film_details: [],
  person_details: [],
  serie_details: [],
  type_media: "",
};

export default function FilmReducer(store = initialState, action) {
  switch (action.type) {
    case ACTIONS.READ_FILMS:
      return { ...store, films: action.payload };
    case ACTIONS.FILM_DETAILS:
      return { ...store, film_details: action.payload };
    case ACTIONS.PERSON_DETAILS:
      return { ...store, person_details: action.payload };
    case ACTIONS.SERIE_DETAILS:
      return { ...store, serie_details: action.payload };
    case ACTIONS.MEDIA_TYPE:
      return { ...store, type_media: action.payload };

    default:
      return store;
  }
}
