import ACTIONS from "../ActionsCreators/FilmTypes";

const initialState = {
  resources: {},
  filmDetails: {},
  personDetails: {},
  serieDetails: {},
  typeMedia: "",
};

export default function MediaReducer(store = initialState, action) {
  switch (action.type) {
    case ACTIONS.READ_RESOURCES:
      return { ...store, resources: action.payload };
    case ACTIONS.FILM_DETAILS:
      return { ...store, filmDetails: action.payload };
    case ACTIONS.PERSON_DETAILS:
      return { ...store, personDetails: action.payload };
    case ACTIONS.SERIE_DETAILS:
      return { ...store, serieDetails: action.payload };
    case ACTIONS.MEDIA_TYPE:
      return { ...store, typeMedia: action.payload };

    default:
      return store;
  }
}
