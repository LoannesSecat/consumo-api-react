import { describe, expect, test } from "vitest";
import {
  FilmDetails, MediaType, PersonDetails, ReadResources, SerieDetails,
} from "~/services/MediaServices";
import { SearchText } from "~/services/ToolServices";
import store from "~/redux/selectors/MyStore";

const Media = () => store({ reducer: "media" });
const LengthExtract = (value, mediaType, wantKnow) => {
  if (wantKnow === "id") return Object.values(Media()[value]).find((e) => e.media_type === mediaType).id;
  if (wantKnow === "size") return Object.values(Media()[value]).length;
};

describe.concurrent("Check the functions of FilmActions", async () => {
  let aux_id;

  await ReadResources();

  test("ReadResources function", () => expect(LengthExtract("RESOURCES", "movie", "size")).toBeGreaterThanOrEqual(2));

  aux_id = LengthExtract("RESOURCES", "movie", "id");
  await FilmDetails({ id: aux_id });
  test("FilmDetails function", () => expect(LengthExtract("FILM_DETAILS", "movie", "size")).toBeGreaterThanOrEqual(2));

  aux_id = LengthExtract("RESOURCES", "tv", "id");
  await SerieDetails({ id: aux_id });
  test("SerieDetails function", () => expect(LengthExtract("SERIE_DETAILS", "tv", "size")).toBeGreaterThanOrEqual(2));

  SearchText("Will Smith");
  await ReadResources();
  aux_id = LengthExtract("RESOURCES", "person", "id");
  await PersonDetails({ id: aux_id });
  test("PersonDetails function", () => expect(LengthExtract("PERSON_DETAILS", "person", "size")).toBeGreaterThanOrEqual(2));

  test("MediaType function", () => {
    expect(Media().TYPE_MEDIA).toBe("");
    MediaType("movie");
    expect(Media().TYPE_MEDIA).toBe("movie");
  });
});
