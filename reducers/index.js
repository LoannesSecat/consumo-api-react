import { combineReducers } from "redux";
import MediaReducer from "./MediaReducer";
import ToolReducer from "./ToolReducer";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  media: MediaReducer,
  user: UserReducer,
  tool: ToolReducer,
};

export default combineReducers(INITIAL_STATE);
