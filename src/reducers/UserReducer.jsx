import ACTIONS from "../utils/ActionsCreators/UserTypes";

const initialState = {};

const UserReducer = (store = initialState, action) => {
  switch (action.type) {
    case "a":
      console.log("UserReducer: ", action);
    case "b":
      console.log("UserReducer: ", action);

    default:
      return store;
  }
};

export default UserReducer;
