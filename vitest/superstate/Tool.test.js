import { describe, expect, test } from "vitest";
import ToolC from "~/superstate/Tool";

const {
  state,
  newPage,
  nextMediaPage,
  previousMediaPage,
  searchText,
  totalPages,
} = ToolC;

describe.concurrent("Check the functions of ToolActions", () => {
  const { now } = state;

  test("newPage function", () => {
    expect(now().PAGE).toBe(1);
    newPage(10);
    expect(now().PAGE).toBe(10);
  });

  test("nextMediaPage function", () => {
    newPage();
    expect(now().PAGE).toBe(1);
    nextMediaPage();
    expect(now().PAGE).toBe(2);
    nextMediaPage();
    nextMediaPage();
    expect(now().PAGE).toBe(4);
  });

  test("previousMediaPage function", () => {
    previousMediaPage();
    expect(now().PAGE).toBe(3);
    newPage();
    expect(now().PAGE).toBe(1);
  });

  test("searchText function", () => {
    expect(now().SEARCH_TEXT).toBe("");
    searchText("testing");
    expect(now().SEARCH_TEXT).toBe("testing");
  });

  test("totalPages function", () => {
    expect(now().TOTAL_PAGES).toBe(1);
    totalPages(500);
    expect(now().TOTAL_PAGES).toBe(500);
  });
});
