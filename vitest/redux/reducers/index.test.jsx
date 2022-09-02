import { test, expect } from "vitest";
import store from '../../../src/utils/UseStore'
import { Reducers } from '../../Mocks'

test('Check if the reducers runs good', () => {
  expect(Reducers).toMatchObject(store());
});
