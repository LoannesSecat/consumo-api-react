import { expect, test } from "vitest";
import FilmActions from "~/redux/actions/FilmActions.json";
import Dispatch from "~/redux/selectors/MyDispatch";
import store from "~/redux/selectors/MyStore";

test("This check if custom useDispatch is working", () => {
  expect(store({ reducer: "media", value: "TYPE_MEDIA" })).toBe("");
  Dispatch({ type: FilmActions.MEDIA_TYPE, payload: "tested" });
  expect(store({ reducer: "media", value: "TYPE_MEDIA" })).toBe("tested");
});
