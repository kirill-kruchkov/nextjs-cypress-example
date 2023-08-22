it('renders the JSON', () => {
  cy.visit('/')
  cy.contains('UserID: 1').should('be.visible')
})


