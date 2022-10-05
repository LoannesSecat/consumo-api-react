import ACTIONS from "../ActionsCreators/UserTypes";

const initialState = {
  userData: [],
  token: [],
  session: false,
};

export default function UserReducer(store = initialState, action) {
  switch (action.type) {
    case ACTIONS.READ_USER:
      return { ...store, userData: action.payload };
    case ACTIONS.READ_TOKEN:
      return { ...store, token: action.payload };
    case ACTIONS.DELETE_USER:
      return { ...store, userData: [] };
    case ACTIONS.DELETE_TOKEN:
      return { ...store, token: [] };
    case ACTIONS.UPDATE_SESSION:
      return { ...store, session: action.payload };

    default:
      return store;
  }
}
