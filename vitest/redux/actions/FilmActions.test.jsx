import { describe, expect, test } from "vitest";
import {
  FilmDetails, MediaType, PersonDetails, ReadFilms, SerieDetails,
} from "~/redux/actions/FilmActions";
import { SearchText } from "~/redux/actions/ToolActions";
import store from "~/utils/MyStore";

const Film = () => store({ reducer: "film" });
const LengthExtract = (reducerValue, mediaType, wantKnow) => {
  if (wantKnow === "id") return Object.values(Film()[reducerValue]).find((e) => e.media_type === mediaType).id;
  if (wantKnow === "size") return Object.values(Film()[reducerValue]).length;
};

describe.concurrent("Check the functions of FilmActions", async () => {
  let aux_id;

  await ReadFilms();

  test("ReadFilms function", () => expect(LengthExtract("films", "movie", "size")).toBeGreaterThanOrEqual(2));

  aux_id = LengthExtract("films", "movie", "id");
  await FilmDetails({ id: aux_id });
  test("FilmDetails function", () => expect(LengthExtract("filmDetails", "movie", "size")).toBeGreaterThanOrEqual(2));

  aux_id = LengthExtract("films", "tv", "id");
  await SerieDetails({ id: aux_id });
  test("SerieDetails function", () => expect(LengthExtract("serieDetails", "tv", "size")).toBeGreaterThanOrEqual(2));

  SearchText("Will Smith");
  await ReadFilms();
  aux_id = LengthExtract("films", "person", "id");
  await PersonDetails({ id: aux_id });
  test("PersonDetails function", () => expect(LengthExtract("personDetails", "person", "size")).toBeGreaterThanOrEqual(2));

  test("MediaType function", () => {
    expect(Film().typeMedia).toBe("");
    MediaType("movie");
    expect(Film().typeMedia).toBe("movie");
  });
});
