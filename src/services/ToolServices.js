import ToolActions from "~/redux/actions/ToolActions.json";
import MyDispatch from "~/redux/selectors/MyDispatch";
import { ReadResources } from "./MediaServices";

export function NewPage(page) {
  MyDispatch({ type: ToolActions.NEW_PAGE, payload: page || 1 });
}

export function NextFilmsPage() {
  MyDispatch({ type: ToolActions.NEXT_FILMS_PAGE });

  ReadResources();
}

export function PreviousFilmsPage() {
  MyDispatch({
    type: ToolActions.PREVIOUS_FILMS_PAGE,
  });

  ReadResources();
}

export function SearchText(text) {
  MyDispatch({
    type: ToolActions.SEARCH_TEXT,
    payload: text || "",
  });
}

export function TotalPages(numPages) {
  MyDispatch({
    type: ToolActions.TOTAL_NUM_PAGES,
    payload: numPages,
  });
}
