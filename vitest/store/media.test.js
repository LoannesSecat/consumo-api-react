import { beforeEach, describe, expect, test } from "vitest";
import { readMedia, readMediaDetails } from "~/services/media-services";
import { getStore } from "~/utils/functions";

const auxStore = () => getStore("media");

describe.concurrent("Check the media utilities", async () => {
  test("changePage function", () => {
    expect(auxStore().page).toBe(1);
    auxStore().changePage(3);
    expect(auxStore().page).toBe(3);
    auxStore().changePage();
    expect(auxStore().page).toBe(1);
  });

  test("changeSearchText function", () => {
    expect(auxStore().filterText).toBe("");
    auxStore().changeSearchText("movie");
    expect(auxStore().filterText).toBe("movie");
    auxStore().changeSearchText("test");
    auxStore().changeSearchText();
    expect(auxStore().filterText).toBe("");
  });
});

describe.concurrent("Check the media services", async () => {
  beforeEach(async () => {
    await readMedia();
  });

  test.concurrent("readMedia service", async () => {
    expect(auxStore().data.length).toBeGreaterThanOrEqual(2);
  });

  test.concurrent("readMediaDetails service with movie", async () => {
    const foundMovie = auxStore().data.find((e) => e.media_type === "movie");
    await readMediaDetails({ id: foundMovie.id, media_type: "movie" });
    expect(Object.values(auxStore().details).length).toBeGreaterThanOrEqual(2);
  });

  test.concurrent("readMediaDetails service with serie", async () => {
    const foundSerie = auxStore().data.find((e) => e.media_type === "tv");
    await readMediaDetails({ id: foundSerie.id, media_type: "tv" });
    expect(Object.values(auxStore().details).length).toBeGreaterThanOrEqual(2)
  });

  test.concurrent("readMediaDetails service with person", async () => {
    auxStore().changeSearchText("Will Smith");
    await readMedia();
    const foundProfile = auxStore().data.find((e) => e.media_type === "person");
    await readMediaDetails({ id: foundProfile.id, media_type: "person" });
    expect(Object.values(auxStore().details).length).toBeGreaterThanOrEqual(2)
    auxStore().changeSearchText();
  });
});
