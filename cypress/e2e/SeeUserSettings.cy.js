import { credentials, url } from "../fixtures/vite.json";

it("Check if the user settings page is visible", () => {
  cy.visit(url.preview);

  cy.get("button").contains("Iniciar sesión", { matchCase: false }).click();
  cy.get("input[type='email'").clear().type(credentials.email);
  cy.get("input[type='password'").clear().type(credentials.password);
  cy.get("button").contains("Iniciar sesión", { matchCase: false }).click();

  cy.get(".user-options article span").should("be.visible").contains("user_test");
  cy.get(".dropdown-options button").click();
  cy.get(".dropdown").should("be.visible").contains("ajustes", { matchCase: false }).click();

  cy.get(".avatar").should("be.visible");
  cy.get(".nickname").should("be.visible");
  cy.get(".email").should("be.visible");
  cy.get(".password").should("be.visible");

  cy.get(".nickname input").clear().type("a");
  cy.get(".save-changes-button").should("be.visible");

  cy.get(".go-back-button").click();

  cy.get(".dropdown-button").click();
  cy.get(".dropdown.active").should("be.visible");
  cy.get(".dropdown.active>a").contains("Cerrar sesión", { matchCase: false }).should("be.visible").click();
  cy.get(".iziToast-wrapper").contains("sesión cerrada", { matchCase: false }).should("be.visible");
});
