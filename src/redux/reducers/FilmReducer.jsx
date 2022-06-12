import ACTIONS from "../ActionsCreators/FilmTypes";

const initialState = {
  films: [],
  film_details: JSON.parse(localStorage.getItem("FILM_DETAILS")) ?? [],
  person_details: JSON.parse(localStorage.getItem("PERSON_DETAILS")) ?? [],
  serie_details: JSON.parse(localStorage.getItem("SERIE_DETAILS")) ?? [],
  type_media: localStorage.getItem("MEDIA_TYPE") ?? "",
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
