import { describe, expect, test } from "vitest";
import Parameters from "~/utils/Parameters";

const { OMDb, TMDb } = Parameters;

describe.concurrent("Test API on use", () => {
  test("The Movie Database API", async () => {
    const res = fetch(TMDb.url);
    await expect(res).resolves.toHaveProperty("status", 200);
  });

  test("Open Movie Database API", async () => {
    const res = fetch(OMDb.url);
    await expect(res).resolves.toHaveProperty("status", 200);
  });
});
