import { describe, expect, test } from "vitest";
import { formValidator } from "~/utils/functions.js";

const email_pass = {
  email: "",
  password: "",
};

describe("Checks if the form validator is working", () => {
  test.concurrent("Email & password empty but empty password", () => {
    expect(formValidator(email_pass)).toBe(false);
  });

  test.concurrent("Email with wrong format but empty password", () => {
    email_pass.email = "test@gmi.c";
    expect(formValidator(email_pass)).toBe(false);
  });

  test.concurrent("Correct email but empty password", () => {
    email_pass.email = "test@gmail.com";
    expect(formValidator(email_pass)).toBe(false);
  });

  test.concurrent("Email & password not empty but password have only five characters", () => {
    email_pass.email = "test@gmail.com";
    email_pass.password = "12345";
    expect(formValidator(email_pass)).toBe(false);
  });

  test.concurrent("Email & password are good, and also password has six or more characters", () => {
    email_pass.email = "test@gmail.com";
    email_pass.password = "123456 _*";

    expect(formValidator(email_pass)).toBe(true);
  });
});
