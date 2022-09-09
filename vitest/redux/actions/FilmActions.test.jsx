import { describe, expect, test } from "vitest";
import {
  FilmDetails, MediaType, PersonDetails, ReadResources, SerieDetails,
} from "~/redux/actions/MediaActions";
import { SearchText } from "~/redux/actions/ToolActions";
import store from "~/utils/MyStore";

const Media = () => store({ reducer: "media" });
const LengthExtract = (value, mediaType, wantKnow) => {
  if (wantKnow === "id") return Object.values(Media()[value]).find((e) => e.media_type === mediaType).id;
  if (wantKnow === "size") return Object.values(Media()[value]).length;
};

describe.concurrent("Check the functions of FilmActions", async () => {
  let aux_id;

  await ReadResources();

  test("ReadResources function", () => expect(LengthExtract("resources", "movie", "size")).toBeGreaterThanOrEqual(2));

  aux_id = LengthExtract("resources", "movie", "id");
  await FilmDetails({ id: aux_id });
  test("FilmDetails function", () => expect(LengthExtract("filmDetails", "movie", "size")).toBeGreaterThanOrEqual(2));

  aux_id = LengthExtract("resources", "tv", "id");
  await SerieDetails({ id: aux_id });
  test("SerieDetails function", () => expect(LengthExtract("serieDetails", "tv", "size")).toBeGreaterThanOrEqual(2));

  SearchText("Will Smith");
  await ReadResources();
  aux_id = LengthExtract("resources", "person", "id");
  await PersonDetails({ id: aux_id });
  test("PersonDetails function", () => expect(LengthExtract("personDetails", "person", "size")).toBeGreaterThanOrEqual(2));

  test("MediaType function", () => {
    expect(Media().typeMedia).toBe("");
    MediaType("movie");
    expect(Media().typeMedia).toBe("movie");
  });
});
