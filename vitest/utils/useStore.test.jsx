import { expect, test } from "vitest";
import store from "~/utils/MyStore";
import { Reducers, ToolReducer } from "../Mocks";

test("Check if custom useStore is working", () => {
  expect(ToolReducer).toMatchObject(store({ reducer: "tool" }));
  expect(Reducers).toMatchObject(store());
});
