import { describe, expect, test } from "vitest";
import Parameters from "~/utils/Parameters";

const { OMDb, TMDb, SUPABASE } = Parameters;

describe.concurrent("Test API on use", () => {
  test.concurrent("The Movie Database API", async () => {
    const res = fetch(TMDb.url);
    await expect(res).resolves.toHaveProperty("status", 200);
  });

  test.concurrent("Open Movie Database API", async () => {
    const res = fetch(OMDb.url);
    await expect(res).resolves.toHaveProperty("status", 200);
  });

  test.concurrent("Supabase API", async () => {
    const res = fetch(SUPABASE.url);
    await expect(res).resolves.toHaveProperty("status", 401);
  });
});
