import useDispatch from "../../utils/useDispatch";
import ACTIONS from "../ActionsCreators/ToolTypes";
import { ReadFilms } from "./FilmActions";

export const NewPage = (page) =>
  useDispatch({ type: ACTIONS.NEW_PAGE, payload: page ? page : 1 });

export const NextFilmsPage = () => {
  useDispatch({ type: ACTIONS.NEXT_FILMS_PAGE });

  ReadFilms();
};

export const PreviousFilmsPage = () => {
  useDispatch({
    type: ACTIONS.PREVIOUS_FILMS_PAGE,
  });

  ReadFilms();
};

export const MessageAlert = (msg) =>
  useDispatch({
    type: ACTIONS.MESSAGE_ALERT,
    payload: msg,
  });

export const SearchText = (text) =>
  useDispatch({
    type: ACTIONS.SEARCH_TEXT,
    payload: text ? text : "",
  });

export const TotalPages = (numPages) =>
  useDispatch({
    type: ACTIONS.TOTAL_NUM_PAGES,
    payload: numPages,
  });
