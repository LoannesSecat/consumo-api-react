Cypress.Commands.add("title_validation", (title) => {
  const matchCase = { matchCase: false };
  cy.get("header>input").as("HomeInput");

  cy.get("@HomeInput").type(title);
  cy.wait(800);

  cy.get("article>a").should("be.visible").contains(title, matchCase).click();
  cy.wait(500);

  cy.get("h2").contains(title, matchCase);
  cy.get("button").contains("Volver").click();
  cy.get("header>input").clear();
});
