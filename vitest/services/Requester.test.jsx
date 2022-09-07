import { describe, expect, test } from "vitest";
import ACTIONS from "~/redux/ActionsCreators/FilmTypes";
import Requester from "~/services/Requester";
import Store from "~/utils/MyStore";
import Parameters from "~/utils/Parameters";

const { TMDb } = Parameters;

describe.concurrent("Check the actions of Requester file", () => {
  test("Loading", () => {
    Requester({ request: null, mock: null, action: ACTIONS.READ_FILMS });
    const films = Store({ reducer: "film", value: "films" });
    expect(films).toEqual("loading");
  });

  test("Request", async () => {
    const req = `${TMDb.url_v3}${TMDb.tv}${89393}?${TMDb.api_key}&${TMDb.language}`;
    const conf = { request: req, action: ACTIONS.SERIE_DETAILS };
    const res = await Requester(conf);

    expect(Object.entries(res)).toHaveLength(3);
    expect(res.value).toHaveProperty("name", "9-1-1: Lone Star");
  });
});
