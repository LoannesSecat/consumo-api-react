Cypress.Commands.add("title_validation", (title) => {
  const matchCase = { matchCase: false };
  cy.get("header.header input").as("HomeInput");

  cy.get("@HomeInput").clear().type(title);
  cy.wait(800);

  cy.get(".card-media a").should("be.visible").contains(title, matchCase).click();
  cy.wait(500);

  cy.get("h1").contains(title, matchCase);
  cy.get("button.go-back-button").click();
});
