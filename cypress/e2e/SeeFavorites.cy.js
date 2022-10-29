import { credentials, url } from "../fixtures/vite.json";

const nameMedia = "Cyberpunk: Edgerunners";

it("Checks is the favorites pages works good", () => {
  cy.visit(url.preview);
  cy.wait(1000);

  cy.get(".save-favorite-button").first().click();
  cy.wait(500);
  cy.get(".iziToast-wrapper")
    .contains("Debes iniciar sesión para agregar", { matchCase: false })
    .should("be.visible");

  cy.get("button").contains("iniciar sesión", { matchCase: false }).click();
  cy.get("input[type='email']").type(credentials.email);
  cy.get("input[type='password']").type(credentials.password);
  cy.get("button").contains("iniciar", { matchCase: false }).click();
  cy.wait(500);

  cy.get(".search-input").clear().type(nameMedia);
  cy.wait(1000);
  cy.get(".card-media .save-favorite-button").first().click();

  cy.get(".dropdown-options button").click();
  cy.get(".dropdown").should("be.visible").contains("Favoritos", { matchCase: false }).click();
  cy.get(".card").contains(nameMedia).should("be.visible");

  cy.get(".card button.save-favorite-button").first().click();
  cy.wait(1000);
  cy.get(".empty").contains("No hay nada para mostrar").should("be.visible");

  cy.get(".dropdown-options button").click();
  cy.get(".dropdown").should("be.visible").contains("Cerrar sesión", { matchCase: false }).click();
  cy.get(".iziToast-wrapper").contains("sesión cerrada", { matchCase: false }).should("be.visible");
});
