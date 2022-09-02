import { expect, test } from "vitest"
import Dispatch from "~/utils/MyDispatch"
import ACTION from '~/redux/ActionsCreators/FilmTypes'
import store from '~/utils/MyStore'

test("This check if custom useDispatch is working", () => {
  expect(store({ reducer: "film", value: "type_media" })).toBe("")
  Dispatch({ type: ACTION.MEDIA_TYPE, payload: "tested" })
  expect(store({ reducer: "film", value: "type_media" })).toBe("tested")
})