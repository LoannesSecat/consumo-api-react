Cypress.Commands.add("title_validation", (title) => {
  const matchCase = { matchCase: false };
  cy.get("input").as("home-input");

  cy.get("@home-input").type(title);
  cy.wait(800);

  cy.get("article>a").should("be.visible").contains(title, matchCase).click();
  cy.wait(500);

  cy.get("h1").contains(title, matchCase);
  cy.get("button").contains("Volver").click();
  cy.get("@home-input").clear();
});
