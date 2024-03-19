import { credentials, url } from "../fixtures/vite.json";

const matchCase = { matchCase: false };

it("Check if the user settings page is visible", () => {
  cy.visit(url);

  cy.get("button").contains("Iniciar sesión", { matchCase: false }).click();
  cy.get("input[type='email'").clear().type(credentials.email);
  cy.get("input[type='password'").clear().type(credentials.password);
  cy.get("button").contains("Iniciar sesión", { matchCase: false }).click();

  cy.get("header>section>figure").should("be.visible").contains(credentials.nickname);
  cy.get("header>section>article:nth-child(2)>button").click();
  cy.get("header>section>article").should("be.visible").contains("ajustes", { matchCase: false }).click();

  cy.get("article").contains("Foto", matchCase).should("be.visible");
  cy.get("article").contains("Nombre de usuario", matchCase).should("be.visible");
  cy.get("article").contains("Correo", matchCase).should("be.visible");
  cy.get("article").contains("Contraseña", matchCase).should("be.visible");
  cy.get("button").contains("Eliminar cuenta", matchCase).should("be.visible");

  cy.get("article>div>input").first().type("a");
  cy.get("button").contains("Guardar cambios", matchCase).should("be.visible");

  cy.get("button").contains("Volver").click();

  cy.get("header>section>article:nth-child(2)>button").click();
  cy.get("header>section>article").should("be.visible");
  cy.get("header>section>article").contains("Cerrar sesión", { matchCase: false }).should("be.visible").click();
  cy.get(".iziToast-wrapper").contains("sesión cerrada", { matchCase: false }).should("be.visible");
});
