import { credentials, url } from "../fixtures/vite.json";

const nameMedia = "Cyberpunk: Edgerunners";

it("Checks is the favorites pages works good", () => {
  cy.visit(url);
  cy.wait(1000);

  cy.get("main>article>button").first().click();
  cy.wait(500);
  cy.get(".iziToast-wrapper")
    .contains("Debes iniciar sesión para agregar", { matchCase: false })
    .should("be.visible");

  cy.get("button").contains("iniciar sesión", { matchCase: false }).click();
  cy.get("input[type='email']").type(credentials.email);
  cy.get("input[type='password']").type(credentials.password);
  cy.get("button").contains("iniciar", { matchCase: false }).click();
  cy.wait(500);

  cy.get("header>div>input").clear().type(nameMedia);
  cy.wait(1000);
  cy.get("main>article>button").first().click();

  cy.get("header>div>section>article>button").click();
  cy.get("header>div>section>article").should("be.visible").contains("Favoritos", { matchCase: false }).click();
  cy.get("main>section>article:first-child").contains(nameMedia).should("be.visible");

  cy.get("main>section>article:first-child>hgroup>div>button").click();
  cy.wait(1000);
  cy.get("p").contains("No hay nada para mostrar").should("be.visible");

  cy.get("header>div>section>article>button").click();
  cy.get("header>div>section>article").should("be.visible").contains("Cerrar sesión", { matchCase: false }).click();
  cy.wait(1000);
  cy.get(".iziToast-wrapper").contains("sesión cerrada", { matchCase: false }).should("be.visible");
});
