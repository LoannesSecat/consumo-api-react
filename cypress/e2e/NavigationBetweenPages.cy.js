import { url } from '../fixtures/vite'

it('Navigation between pages', () => {
  cy.visit(url.preview)

  const NumPages = cy.get(".FilmsPagination span")

  NumPages.contains("1")
  cy.get("button")
    .contains("Siguiente")
    .dblclick()

  cy.wait(1000)

  NumPages.contains("3")
  cy.get("button")
    .contains("Siguiente")
    .dblclick()
    .dblclick()

  cy.wait(1000)

  NumPages.contains("7")
  cy.get("button")
    .contains("Anterior")
    .dblclick()
    .click()

  cy.wait(1000)

  NumPages.contains("4")
})
