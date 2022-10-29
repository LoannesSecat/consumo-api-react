import { url } from "../fixtures/vite.json";

it("Navigation between pages", () => {
  cy.visit(url.preview);

  cy.get(".media-pagination span").as("NumPages");
  cy.get("body").find(".media").children(".card-media");
  cy.get("@NumPages").should("be.visible").contains("1");

  cy.get("button").contains("Siguiente").dblclick();

  cy.wait(1000);
  cy.get("@NumPages").should("be.visible").contains("3");

  cy.get("button").contains("Siguiente").dblclick().dblclick();

  cy.wait(1000);
  cy.get("@NumPages").should("be.visible").contains("7");

  cy.get("button").contains("Anterior").dblclick().click();

  cy.wait(1000);
  cy.get("@NumPages").should("be.visible").contains("4");
});
