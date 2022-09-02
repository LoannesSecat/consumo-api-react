import { expect, test } from "vitest";
import ThereIsInternet from '../../src/utils/ThereIsInternet'

test('Test the Internet connection', () => expect(ThereIsInternet).toBeTruthy())