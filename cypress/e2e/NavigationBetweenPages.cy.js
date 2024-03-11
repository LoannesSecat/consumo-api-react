import { url } from "../fixtures/vite.json";

it("Navigation between pages", () => {
  cy.visit(url);

  cy.get("input[type='number']").as("page-number");
  cy.get("body").find("main").children("article");
  cy.get("@page-number").should("contain.value", "1");

  cy.get("button").contains("Siguiente").click().click();

  cy.wait(1000);
  cy.get("@page-number").should("contain.value", "3");

  cy.get("button").contains("Siguiente").click().click().click().click();

  cy.wait(1000);
  cy.get("@page-number").should("contain.value", "7");

  cy.get("button").contains("Anterior").click().click().click();

  cy.wait(1000);
  cy.get("@page-number").should("contain.value", "4");
});
