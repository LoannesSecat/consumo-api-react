import { test, url } from "../fixtures/vite.json";

it("Simple user log in", () => {
  cy.visit(url.preview);
  cy.wait(1000);

  cy.get(".card-media:nth-child(4)").click();
  cy.get("button").contains("iniciar sesión", { matchCase: false }).click();
  cy.get("input[type='email']").type(test.email);
  cy.get("input[type='password']").type(test.pass);
  cy.get("button").contains("iniciar", { matchCase: false }).click();
  cy.get(".user-options div span").should("be.visible").contains("user_test");
  cy.get(".user-options button").contains("salir", { matchCase: false }).click();

  cy.wait(500);

  cy.get(".user-options").children().contains("registrarme", { matchCase: false }).should("be.visible");
  cy.get(".iziToast-wrapper").contains("sesión cerrada", { matchCase: false }).should("be.visible");
});
