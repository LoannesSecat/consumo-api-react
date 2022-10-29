import { describe, expect, test } from "vitest";
import {
  NewPage, NextFilmsPage, PreviousFilmsPage, SearchText, TotalPages,
} from "~/services/ToolServices";
import MyStore from "~/redux/selectors/MyStore";

const Tool = () => MyStore({ reducer: "tool" });

describe.concurrent("Check the functions of ToolActions", () => {
  test("NewPage function", () => {
    expect(Tool().PAGE).toBe(1);
    NewPage(10);
    expect(Tool().PAGE).toBe(10);
  });

  test("NextFilmsPage function", () => {
    NewPage();
    expect(Tool().PAGE).toBe(1);
    NextFilmsPage();
    expect(Tool().PAGE).toBe(2);
    NextFilmsPage();
    NextFilmsPage();
    expect(Tool().PAGE).toBe(4);
  });

  test("PreviousFilmsPage function", () => {
    PreviousFilmsPage();
    expect(Tool().PAGE).toBe(3);
    NewPage();
    expect(Tool().PAGE).toBe(1);
  });

  test("SearchText function", () => {
    expect(Tool().SEARCH_TEXT).toBe("");
    SearchText("testing");
    expect(Tool().SEARCH_TEXT).toBe("testing");
  });

  test("TotalPages function", () => {
    expect(Tool().TOTAL_PAGES).toBe(1);
    TotalPages(500);
    expect(Tool().TOTAL_PAGES).toBe(500);
  });
});
