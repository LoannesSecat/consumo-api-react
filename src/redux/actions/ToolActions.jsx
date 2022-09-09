import Dispatch from "~/utils/MyDispatch";
import ACTIONS from "../ActionsCreators/ToolTypes";
import { ReadResources } from "./MediaActions";

export const NewPage = (page) => Dispatch({ type: ACTIONS.NEW_PAGE, payload: page || 1 });

export const NextFilmsPage = () => {
  Dispatch({ type: ACTIONS.NEXT_FILMS_PAGE });

  ReadResources();
};

export const PreviousFilmsPage = () => {
  Dispatch({
    type: ACTIONS.PREVIOUS_FILMS_PAGE,
  });

  ReadResources();
};

export const MessageAlert = (value) => {
  Dispatch({
    type: ACTIONS.MESSAGE_ALERT,
    payload: value,
  });
};

export const SearchText = (text) => Dispatch({
  type: ACTIONS.SEARCH_TEXT,
  payload: text || "",
});

export const TotalPages = (numPages) => Dispatch({
  type: ACTIONS.TOTAL_NUM_PAGES,
  payload: numPages,
});
