import MyDispatch from "~/utils/MyDispatch";
import ToolTypes from "../ActionsCreators/ToolTypes";
import { ReadResources } from "./MediaActions";

export const NewPage = (page) => MyDispatch({ type: ToolTypes.NEW_PAGE, payload: page || 1 });

export const NextFilmsPage = () => {
  MyDispatch({ type: ToolTypes.NEXT_FILMS_PAGE });

  ReadResources();
};

export const PreviousFilmsPage = () => {
  MyDispatch({
    type: ToolTypes.PREVIOUS_FILMS_PAGE,
  });

  ReadResources();
};

export const SearchText = (text) => MyDispatch({
  type: ToolTypes.SEARCH_TEXT,
  payload: text || "",
});

export const TotalPages = (numPages) => MyDispatch({
  type: ToolTypes.TOTAL_NUM_PAGES,
  payload: numPages,
});
