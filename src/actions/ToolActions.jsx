import useDispatch from "../hooks/useDispatch";
import ACTIONS from "../helpers/ActionsCreators/ToolTypes";

export const NextFilmsPage = () => {
  useDispatch({ type: ACTIONS.NEXT_FILMS_PAGE });
};

export const PreviousFilmsPage = () => {
  useDispatch({
    type: ACTIONS.PREVIOUS_FILMS_PAGE,
  });
};
