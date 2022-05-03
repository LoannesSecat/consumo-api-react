import Parameters from "../api/Parameters";
import Soliciter from "../api/Soliciter";
import db from "../api/db";
import RequestMode from "../api/RequestMode";
import ACTIONS from "../helpers/ActionsCreators/FilmTypes";
import useDispatch from "../hooks/useDispatch";
import store from "../store";

const TMDb = Parameters.TMDb;

export const ReadFilms = ({ page }) => {
  let myPage = null,
    req = `${TMDb.url_v3}${TMDb.multi_search}?${TMDb.api_key}&${
      TMDb.query
    }${1}&${TMDb.page}${page}&${TMDb.language}&${TMDb.include_adult}`;

  page > Object.keys(db.Films).length
    ? (myPage = Object.keys(db.Films).length)
    : (myPage = page);

  if (RequestMode === "test") {
    useDispatch({
      type: ACTIONS.READ_FILMS,
      payload: db.Films[`page_${myPage}`],
    });
  }

  if (RequestMode === "real") {
    Soliciter(req).then((e) => {
      useDispatch({
        type: ACTIONS.READ_FILMS,
        payload: e.results.filter((e) => e.media_type !== "person"), //Excluye los datos con media_type igual a "person"
      });
    });
  }
};

export const FilmDetails = async ({ media_type, id }) => {
  let req = "",
    myData = {};

  switch (media_type) {
    case "tv":
      req = `${TMDb.url_v3}${TMDb.tv}${id}?${TMDb.api_key}&${TMDb.language}`;
      myData = db.SelectedFilm.tv;
      break;

    case "movie":
      req = `${TMDb.url_v3}${TMDb.movie}${id}?${TMDb.api_key}&${TMDb.language}`;
      myData = db.SelectedFilm.movie;
      break;
  }

  if (RequestMode === "test") {
    useDispatch({
      type: ACTIONS.FILM_DETAILS,
      payload: myData,
    });
  }

  if (RequestMode === "real") {
    Soliciter(req).then((e) => {
      useDispatch({
        type: ACTIONS.FILM_DETAILS,
        payload: e,
      });
    });
  }
};

export const ReadGender = async ({ id }) => {};
