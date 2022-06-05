import ACTIONS from "../ActionsCreators/ToolTypes";

const initialState = {
  page: 1,
  min_page: 1,
  total_pages: 1,
  alert_message: { msg: "", color: "" },
  search_text: "",
};

export default function ToolReducer(store = initialState, action) {
  switch (action.type) {
    case ACTIONS.NEW_PAGE:
      return { ...store, page: action.payload };
    case ACTIONS.NEXT_FILMS_PAGE:
      return { ...store, page: store.page + 1 };
    case ACTIONS.PREVIOUS_FILMS_PAGE:
      return { ...store, page: store.page - 1 };
    case ACTIONS.MINIMUM_NUM_PAGES:
      return { ...store, min_page: action.payload };
    case ACTIONS.MESSAGE_ALERT:
      return { ...store, alert_message: action.payload };
    case ACTIONS.SEARCH_TEXT:
      return { ...store, search_text: action.payload };
    case ACTIONS.TOTAL_NUM_PAGES:
      return { ...store, total_pages: action.payload };

    default:
      return store;
  }
}
