import { combineReducers } from "redux";
import MediaReducer from "./MediaReducer";
import ToolReducer from "./ToolReducer";
import UserReducer from "./UserReducer";

const initialState = {
  media: MediaReducer,
  user: UserReducer,
  tool: ToolReducer,
};

export default combineReducers(initialState);
