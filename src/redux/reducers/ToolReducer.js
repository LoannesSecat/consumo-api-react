import ACTIONS from "../ActionsCreators/ToolTypes";

const initialState = {
  page: 1,
  minPage: 1,
  totalPages: 1,
  searchText: "",
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
      return { ...store, minPage: action.payload };
    case ACTIONS.SEARCH_TEXT:
      return { ...store, searchText: action.payload };
    case ACTIONS.TOTAL_NUM_PAGES:
      return { ...store, totalPages: action.payload };

    default:
      return store;
  }
}
