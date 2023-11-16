import { describe, expect, test } from "vitest";
import {
  CapitalizeText, Countries, Languages, MyDate,
} from "../../src/utils/functions.js";

describe.concurrent("Test the functions of Converter file", () => {
  test("Capitalize function. Expect 'Hola mundo'", () => expect(CapitalizeText("hola mundo")).toBe("Hola mundo"));
  test("Languages function. Expect 'Alemán'", () => expect(Languages("de")).toBe("Alemán"));
  test("Countries function. Expect 'Kuwait'", () => expect(Countries("KW")).toBe("Kuwait"));
  test("MyDate function. Expect '09/03/1999'", () => expect(MyDate("1999/03/09")).toBe("Martes, 9 de marzo de 1999"));
});
