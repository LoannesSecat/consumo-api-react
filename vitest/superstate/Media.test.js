import { describe, expect, test } from "vitest";
import MediaC from "~/superstate/Media";
import ToolC from "~/superstate/Tool";

const {
  mediaType,
  mediaDetails,
  readMedia,
  state,
} = MediaC;
const { searchText } = ToolC;

describe.concurrent("Check the functions of superstate/Media file", async () => {
  let auxId;
  const { now } = state;

  await readMedia();
  test("readMedia function", () => expect(now().RESOURCES.length).toBeGreaterThanOrEqual(2));

  auxId = now().RESOURCES.find((e) => e.media_type === "movie")?.id;
  await mediaDetails({ id: auxId }, "movie");
  test("mediaDetails function with movie", () => expect(Object.values(now().FILM_DETAILS).length).toBeGreaterThanOrEqual(2));

  auxId = now().RESOURCES.find((e) => e.media_type === "tv")?.id;
  await mediaDetails({ id: auxId }, "tv");
  test("mediaDetails function with tv/serie", () => expect(Object.values(now().SERIE_DETAILS).length).toBeGreaterThanOrEqual(2));

  searchText("Will Smith");
  await readMedia();
  auxId = now().RESOURCES.find((e) => e.media_type === "person")?.id;
  await mediaDetails({ id: auxId }, "person");
  test("mediaDetails function with person", () => expect(Object.values(now().PERSON_DETAILS).length).toBeGreaterThanOrEqual(2));

  test("mediaType function", () => {
    expect(now().MEDIA_TYPE).toBe("");
    mediaType("movie");
    expect(now().MEDIA_TYPE).toBe("movie");
  });
});
