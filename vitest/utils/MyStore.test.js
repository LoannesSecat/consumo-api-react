import { expect, test } from "vitest";
import { Reducers, ToolReducer } from "vitest/Mocks";
import MyStore from "~/utils/MyStore";

test("Check if custom useStore is working", () => {
  expect(ToolReducer).toMatchObject(MyStore({ reducer: "tool" }));
  expect(Reducers).toMatchObject(MyStore());
});
