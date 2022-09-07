import { expect, test } from "vitest";
import ACTION from "~/redux/ActionsCreators/FilmTypes";
import Dispatch from "~/utils/MyDispatch";
import store from "~/utils/MyStore";

test("This check if custom useDispatch is working", () => {
  expect(store({ reducer: "film", value: "typeMedia" })).toBe("");
  Dispatch({ type: ACTION.MEDIA_TYPE, payload: "tested" });
  expect(store({ reducer: "film", value: "typeMedia" })).toBe("tested");
});
