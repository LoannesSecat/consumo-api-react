import { describe, expect, test } from "vitest";
import MyFetch from "~/services/MyFetch";
import { TMDB } from "~/utils/constants.js";

describe.concurrent("Check the actions of MyFetch file", () => {
  test("Request", async () => {
    const URL = `${TMDB.url_v3}${TMDB.tv}${89393}?${TMDB.key}&${TMDB.language}`;
    const RES = await MyFetch({ path: URL });

    expect(Object.entries(RES)).toHaveLength(2);
    expect(RES.data).toHaveProperty("name", "9-1-1: Lone Star");
  });
});
