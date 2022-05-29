import ACTIONS from "../ActionsCreators/UserTypes";

const initialState = {};

export default function UserReducer(store = initialState, action) {
  switch (action.type) {
    case "a":
      console.log("UserReducer: ", action);
    case "b":
      console.log("UserReducer: ", action);

    default:
      return store;
  }
}
