import { expect, test } from "vitest"
import Dispatch from "../../src/utils/useDispatch"
import ACTION from '../../src/redux/ActionsCreators/FilmTypes'
import Store from '../../src/utils/useStore'

test("This check if custom useDispatch is working", () => {
  expect(Store({ reducer: "film", value: "type_media" })).toBe("")
  Dispatch({ type: ACTION.MEDIA_TYPE, payload: "tested" })
  expect(Store({ reducer: "film", value: "type_media" })).toBe("tested")
})