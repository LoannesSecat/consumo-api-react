import ACTIONS from "../helpers/ActionsCreators/ToolTypes";

const initialState = {
  filmsPagination: 1,
};

const ToolReducer = (store = initialState, action) => {
  switch (action.type) {
    case ACTIONS.NEXT_FILMS_PAGE:
      return { ...store, filmsPagination: store.filmsPagination + 1 };
    case ACTIONS.PREVIOUS_FILMS_PAGE:
      return { ...store, filmsPagination: store.filmsPagination - 1 };

    default:
      return initialState;
  }
};

export default ToolReducer;
