import ToolActions from "../actions/ToolActions.json";

const initialState = {
  PAGE: 1,
  MIN_PAGE: 1,
  TOTAL_PAGES: 1,
  SEARCH_TEXT: "",
};

export default function ToolReducer(store = initialState, action) {
  switch (action.type) {
    case ToolActions.NEW_PAGE:
      return { ...store, PAGE: action.payload };
    case ToolActions.NEXT_FILMS_PAGE:
      return { ...store, PAGE: store.PAGE + 1 };
    case ToolActions.PREVIOUS_FILMS_PAGE:
      return { ...store, PAGE: store.PAGE - 1 };
    case ToolActions.MINIMUM_NUM_PAGES:
      return { ...store, MIN_PAGE: action.payload };
    case ToolActions.SEARCH_TEXT:
      return { ...store, SEARCH_TEXT: action.payload };
    case ToolActions.TOTAL_NUM_PAGES:
      return { ...store, TOTAL_PAGES: action.payload };

    default:
      return store;
  }
}
