import ACTIONS from "../ActionsCreators/FilmTypes";

const aux_film = JSON.parse(localStorage.getItem("FILM_DETAILS")),
  aux_serie = JSON.parse(localStorage.getItem("PERSON_DETAILS")),
  aux_person = JSON.parse(localStorage.getItem("SERIE_DETAILS")),
  aux_type_media = localStorage.getItem("MEDIA_TYPE");

const initialState = {
  films: [],
  film_details: aux_film ? aux_film : [],
  person_details: aux_serie ? aux_serie : [],
  serie_details: aux_person ? aux_person : [],
  type_media: aux_type_media ? aux_type_media : "",
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
