Cypress.Commands.add("title_validation", (title) => {
  const match_case = { matchCase: false }

  cy.get(".Header input").type(title)
  cy.wait(1200)

  cy.get("h2")
    .contains(title, match_case)
    .parent()
    .parent()
    .children("img")
    .click()

  cy.get("h1").contains(title, match_case)
  cy.get("button").contains("Volver").click()
})