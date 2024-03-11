import { describe, expect, test } from "vitest";
import MyFetch from "~/services/my-fetch";
import { TMDB } from "~/utils/constants";

describe.concurrent("Check the actions of MyFetch file", () => {
  test("Request", async () => {
    const url = `${TMDB.url_v3}/tv/${89393}?${TMDB.language}`;
    const res = await MyFetch({ path: url });

    expect(Object.entries(res)).toHaveLength(2);
    expect(res.data).toHaveProperty("name", "9-1-1: Lone Star");
  });
});
