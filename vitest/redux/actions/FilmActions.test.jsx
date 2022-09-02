import { test, describe, expect } from "vitest";
import { FilmDetails, MediaType, PersonDetails, ReadFilms, SerieDetails } from "../../../src/redux/actions/FilmActions";
import { SearchText } from "../../../src/redux/actions/ToolActions";
import store from "../../../src/utils/useStore";

const Film = () => store({ reducer: "film" })
const LengthExtract = (reducer_value, media_type, want_know) => {
  if (want_know === "id")
    return Object.values(Film()[reducer_value]).find(e => e.media_type === media_type).id

  if (want_know === "size")
    return Object.values(Film()[reducer_value]).length
}

describe.concurrent('Check the functions of FilmActions', async () => {
  let aux_id;

  await ReadFilms()

  test('ReadFilms function', () => expect(LengthExtract("films", "movie", "size")).toBeGreaterThanOrEqual(2))

  aux_id = LengthExtract("films", "movie", "id")
  await FilmDetails({ id: aux_id })
  test('FilmDetails function', () => expect(LengthExtract("film_details", "movie", "size")).toBeGreaterThanOrEqual(2))

  aux_id = LengthExtract("films", "tv", "id")
  await SerieDetails({ id: aux_id })
  test('SerieDetails function', () => expect(LengthExtract("serie_details", "tv", "size")).toBeGreaterThanOrEqual(2))

  SearchText("Will Smith")
  await ReadFilms()
  aux_id = LengthExtract("films", "person", "id")
  await PersonDetails({ id: aux_id })
  test('PersonDetails function', () => expect(LengthExtract("person_details", "person", "size")).toBeGreaterThanOrEqual(2))

  test('MediaType function', () => {
    expect(Film().type_media).toBe("")
    MediaType("test")
    expect(Film().type_media).toBe("test")
    MediaType("movie")
    expect(Film().type_media).toBe("movie")
  })
})
