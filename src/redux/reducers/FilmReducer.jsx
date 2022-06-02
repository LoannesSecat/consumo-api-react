import ACTIONS from "../ActionsCreators/FilmTypes";

const initialState = {
  films: [],
  filmDetails: [],
  personDetails: [],
  serieDetails: [],
  mediaType: "",
};

export default function FilmReducer(store = initialState, action) {
  switch (action.type) {
    case ACTIONS.READ_FILMS:
      return { ...store, films: action.payload };
    case ACTIONS.FILM_DETAILS:
      return { ...store, filmDetails: action.payload };
    case ACTIONS.PERSON_DETAILS:
      return { ...store, personDetails: action.payload };
    case ACTIONS.MEDIA_TYPE:
      return { ...store, mediaType: action.payload };
    case ACTIONS.SERIE_DETAILS:
      return { ...store, serieDetails: action.payload };

    default:
      return store;
  }
}
