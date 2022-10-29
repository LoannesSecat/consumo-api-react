import { describe, expect, test } from "vitest";
import MediaActions from "~/redux/actions/MediaActions.json";
import Requester from "~/services/Requester";
import Parameters from "~/utils/Parameters";

const { TMDb } = Parameters;

describe.concurrent("Check the actions of Requester file", () => {
  test("Request", async () => {
    const URL = `${TMDb.url_v3}${TMDb.tv}${89393}?${TMDb.key}&${TMDb.language}`;
    const CONF = { request: URL, action: MediaActions.SERIE_DETAILS };
    const RES = await Requester(CONF);

    expect(Object.entries(RES)).toHaveLength(3);
    expect(RES.value).toHaveProperty("name", "9-1-1: Lone Star");
  });
});
