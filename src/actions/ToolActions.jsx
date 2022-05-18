import useDispatch from "@/hooks/useDispatch";
import ACTIONS from "@/utils/ActionsCreators/ToolTypes";

export const NextFilmsPage = () => {
  useDispatch({ type: ACTIONS.NEXT_FILMS_PAGE });
};

export const PreviousFilmsPage = () => {
  useDispatch({
    type: ACTIONS.PREVIOUS_FILMS_PAGE,
  });
};

export const MaximumPages = (numPage) => {
  useDispatch({
    type: ACTIONS.MAXIMUM_NUM_PAGES,
    payload: numPage,
  });
};

export const MessageAlert = (msg) => {
  useDispatch({
    type: ACTIONS.MESSAGE_ALERT,
    payload: msg,
  });
};
