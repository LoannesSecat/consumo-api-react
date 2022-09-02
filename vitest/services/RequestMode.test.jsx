import { expect, test } from "vitest";
import RequestMode from "../../src/services/RequestMode";

test("Check if the RequestMode has good functionality", () => {
  expect(RequestMode.currentMode()).toBe("real")
  RequestMode.changeMode()
  expect(RequestMode.currentMode()).toBe("test")
  RequestMode.changeMode()
  expect(RequestMode.currentMode()).toBe("real")
})