import { describe, expect, test } from "vitest";
import MyFetch from "~/services/MyFetch";
import Parameters from "~/utils/Parameters";

const { TMDb } = Parameters;

describe.concurrent("Check the actions of MyFetch file", () => {
  test("Request", async () => {
    const URL = `${TMDb.url_v3}${TMDb.tv}${89393}?${TMDb.key}&${TMDb.language}`;
    const RES = await MyFetch({ path: URL });

    expect(Object.entries(RES)).toHaveLength(2);
    expect(RES.data).toHaveProperty("name", "9-1-1: Lone Star");
  });
});
