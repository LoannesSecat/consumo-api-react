import { expect, test } from "vitest";
import { Reducers } from "vitest/Mocks";
import store from "~/utils/MyStore";

test("Check if the reducers runs good", () => {
  expect(Reducers).toMatchObject(store());
});
