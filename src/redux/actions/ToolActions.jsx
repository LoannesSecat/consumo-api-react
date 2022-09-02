import Dispatch from "./../../utils/UseDispatch";
import ACTIONS from "../ActionsCreators/ToolTypes";
import { ReadFilms } from "./FilmActions";

export const NewPage = (page) =>
  Dispatch({ type: ACTIONS.NEW_PAGE, payload: page ? page : 1 });

export const NextFilmsPage = () => {
  Dispatch({ type: ACTIONS.NEXT_FILMS_PAGE });

  ReadFilms();
};

export const PreviousFilmsPage = () => {
  Dispatch({
    type: ACTIONS.PREVIOUS_FILMS_PAGE,
  });

  ReadFilms();
};

export const MessageAlert = (value) => {
  Dispatch({
    type: ACTIONS.MESSAGE_ALERT,
    payload: value,
  });
}

export const SearchText = (text) =>
  Dispatch({
    type: ACTIONS.SEARCH_TEXT,
    payload: text ? text : "",
  });

export const TotalPages = (numPages) =>
  Dispatch({
    type: ACTIONS.TOTAL_NUM_PAGES,
    payload: numPages,
  });

