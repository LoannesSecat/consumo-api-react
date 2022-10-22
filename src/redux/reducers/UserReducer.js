import UserActions from "../actions/UserActions.json";

const initialState = {
  USER_DATA: {},
  TOKEN: {},
  SESSION: false,
};

export default function UserReducer(store = initialState, action) {
  switch (action.type) {
    case UserActions.READ_USER:
      return { ...store, USER_DATA: action.payload };
    case UserActions.READ_TOKEN:
      return { ...store, TOKEN: action.payload };
    case UserActions.DELETE_USER:
      return { ...store, USER_DATA: {} };
    case UserActions.DELETE_TOKEN:
      return { ...store, TOKEN: {} };
    case UserActions.UPDATE_SESSION:
      return { ...store, SESSION: action.payload };

    default:
      return store;
  }
}
