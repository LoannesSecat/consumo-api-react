import { url } from "../fixtures/vite.json";

describe("Searching", () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it("A movie", () => {
    cy.title_validation("Yo, robot");
  });

  it("A serie", () => {
    cy.title_validation("Love, death & robots");
  });

  it("A person", () => {
    cy.title_validation("Janelle Monáe");
  });
});
