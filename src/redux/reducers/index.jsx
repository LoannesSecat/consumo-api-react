import { combineReducers } from "redux";
import FilmReducer from "./FilmReducer";
import UserReducer from "./UserReducer";
import ToolReducer from "./ToolReducer";

const initialState = {
  film: FilmReducer,
  user: UserReducer,
  tool: ToolReducer,
}
export default combineReducers(initialState);

