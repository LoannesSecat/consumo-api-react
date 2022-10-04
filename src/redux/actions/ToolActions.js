import MyDispatch from "~/utils/MyDispatch";
import ToolTypes from "../ActionsCreators/ToolTypes";
import { ReadResources } from "./MediaActions";

export function NewPage(page) {
  MyDispatch({ type: ToolTypes.NEW_PAGE, payload: page || 1 });
}

export function NextFilmsPage() {
  MyDispatch({ type: ToolTypes.NEXT_FILMS_PAGE });

  ReadResources();
}

export function PreviousFilmsPage() {
  MyDispatch({
    type: ToolTypes.PREVIOUS_FILMS_PAGE,
  });

  ReadResources();
}

export function SearchText(text) {
  MyDispatch({
    type: ToolTypes.SEARCH_TEXT,
    payload: text || "",
  });
}

export function TotalPages(numPages) {
  MyDispatch({
    type: ToolTypes.TOTAL_NUM_PAGES,
    payload: numPages,
  });
}
