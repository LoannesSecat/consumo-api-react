import { url } from "../fixtures/vite.json";

it("Navigation between pages", () => {
  cy.visit(url.preview);

  cy.get(".FilmsPagination span").as("NumPages");
  cy.get("body")
    .find(".Media")
    .children(".CardMedia");

  cy.get("@NumPages").contains("1");

  cy.get("button")
    .contains("Siguiente")
    .dblclick();

  cy.wait(1000);
  cy.get("@NumPages").contains("3");

  cy.get("button")
    .contains("Siguiente")
    .dblclick()
    .dblclick();

  cy.wait(1000);
  cy.get("@NumPages").contains("7");

  cy.get("button")
    .contains("Anterior")
    .dblclick()
    .click();

  cy.wait(1000);
  cy.get("@NumPages").contains("4");
});
