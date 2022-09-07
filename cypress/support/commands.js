Cypress.Commands.add("title_validation", (title) => {
  const matchCase = { matchCase: false };
  cy.get("div.Header input").as("HomeInput");

  cy.get("@HomeInput").type(title);
  cy.wait(1300);

  cy.get("h2")
    .contains(title, matchCase)
    .parent()
    .parent()
    .children("img")
    .click();

  cy.get("h1").contains(title, matchCase);
  cy.get("button").contains("Volver").click();
  cy.get("@HomeInput").clear();
});
