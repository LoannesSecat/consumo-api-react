import { expect, test } from "vitest"
import store from '../../src/utils/useStore'
import { ToolReducer, Reducers } from '../Mocks'

test('Check if custom useStore is working', () => {
  expect(ToolReducer).toMatchObject(store({ reducer: "tool" }))
  expect(Reducers).toMatchObject(store())
})