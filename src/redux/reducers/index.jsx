import { combineReducers } from "redux";
import FilmReducer from "./FilmReducer";
import ToolReducer from "./ToolReducer";
import UserReducer from "./UserReducer";

const initialState = {
  film: FilmReducer,
  user: UserReducer,
  tool: ToolReducer,
};

export default combineReducers(initialState);
