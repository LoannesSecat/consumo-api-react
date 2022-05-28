import ACTIONS from "../ActionsCreators/FilmTypes";

const initialState = {
  films: [],
  filmDetails: [],
};

export default function FilmReducer(store = initialState, action) {
  switch (action.type) {
    case ACTIONS.READ_FILMS:
      return { ...store, films: action.payload };
    case ACTIONS.FILM_DETAILS:
      return { ...store, filmDetails: action.payload };

    default:
      return store;
  }
}
