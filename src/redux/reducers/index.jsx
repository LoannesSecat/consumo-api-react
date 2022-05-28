import { combineReducers } from "redux";
import FilmReducer from "./FilmReducer";
import UserReducer from "./UserReducer";
import ToolReducer from "./ToolReducer";

export default combineReducers({
  film: FilmReducer,
  user: UserReducer,
  tool: ToolReducer,
});
