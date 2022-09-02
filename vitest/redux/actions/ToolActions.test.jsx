import { describe, expect, test } from "vitest";
import { MessageAlert, NewPage, NextFilmsPage, PreviousFilmsPage, SearchText, TotalPages } from "~/redux/actions/ToolActions";
import store from "~/utils/MyStore";

const Tool = () => store({ reducer: "tool" })

describe.concurrent("Check the functions of ToolActions", () => {
  test('NewPage function', () => {
    expect(Tool().page).toBe(1)
    NewPage(10)
    expect(Tool().page).toBe(10)
  })

  test('NextFilmsPage function', () => {
    NewPage()
    expect(Tool().page).toBe(1)
    NextFilmsPage()
    expect(Tool().page).toBe(2)
    NextFilmsPage()
    NextFilmsPage()
    expect(Tool().page).toBe(4)
  })

  test('PreviousFilmsPage function', () => {
    PreviousFilmsPage()
    expect(Tool().page).toBe(3)
    NewPage()
    expect(Tool().page).toBe(1)
  })

  test('MessageAlert function', () => {
    expect(Tool().alert_message).toMatchObject({ msg: "", color: "" })
    MessageAlert(null)
    expect(Tool().alert_message).toBeNull()
    MessageAlert({ msg: "Test", color: "#000" })
    expect(Tool().alert_message).toMatchObject({ msg: "Test", color: "#000" })
  })

  test('SearchText function', () => {
    expect(Tool().search_text).toBe("")
    SearchText("testing")
    expect(Tool().search_text).toBe("testing")
  })

  test('TotalPages function', () => {
    expect(Tool().total_pages).toBe(1)
    TotalPages(500)
    expect(Tool().total_pages).toBe(500)
  })
})