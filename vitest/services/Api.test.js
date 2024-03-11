import { describe, expect, test } from "vitest";
import { SUPABASE, TMDB } from "~/utils/constants.js";

describe.concurrent("Test API on use", () => {
  test.concurrent("The Movie Database API", async () => {
    const res = fetch(TMDB.url);
    await expect(res).resolves.toHaveProperty("status", 200);
  });


  test.concurrent("Supabase API", async () => {
    const res = fetch(SUPABASE.url);
    await expect(res).resolves.toHaveProperty("status", 401);
  });
});
