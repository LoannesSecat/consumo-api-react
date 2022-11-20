import { url } from "../fixtures/vite.json";

describe("Searching", () => {
  let title = "";

  it("Initial state of home page", () => {
    cy.visit(url.preview);
  });

  it("A movie", () => {
    title = "Yo, robot";
    cy.title_validation(title);
  });

  it("A serie", () => {
    title = "Love, death & robots";
    cy.title_validation(title);
  });

  it("A person", () => {
    title = "Janelle Monáe";
    cy.title_validation(title);
  });
});
