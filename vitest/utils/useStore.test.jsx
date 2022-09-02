import { expect, test } from "vitest"
import store from '~/utils/MyStore'
import { ToolReducer, Reducers } from '../Mocks'

test('Check if custom useStore is working', () => {
  expect(ToolReducer).toMatchObject(store({ reducer: "tool" }))
  expect(Reducers).toMatchObject(store())
})