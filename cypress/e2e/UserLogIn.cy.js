import { credentials, url } from "../fixtures/vite.json";

it("Simple user log in", () => {
  cy.visit(url.preview);
  cy.wait(1000);

  cy.get(".card-media:nth-child(4)").click();
  cy.get("button").contains("iniciar sesión", { matchCase: false }).click();
  cy.get("input[type='email']").type(credentials.email);
  cy.get("input[type='password']").type(credentials.password);
  cy.get("button").contains("iniciar", { matchCase: false }).click();
  cy.get(".user-options article span").should("be.visible").contains(credentials.nickname);
  cy.get(".dropdown-options button").click();
  cy.get(".dropdown").should("be.visible").contains("cerrar sesión", { matchCase: false }).click();
  cy.wait(500);

  cy.get(".user-options").children().contains("registrarme", { matchCase: false }).should("be.visible");
  cy.get(".iziToast-wrapper").contains("sesión cerrada", { matchCase: false }).should("be.visible");
});
