import { getRemote } from 'mockttp'

const server = getRemote()

before(() => {
  cy.wrap(server.start(9999))
})

after(() => {
  cy.wrap(server.stop())
})

it('renders the JSON', () => {
  cy.wrap(server.forGet("/jsonplaceholder/todos/1").always().thenJson(200, { userId: 2 }))
  cy.visit('/')
  cy.contains('UserID: 2').should('be.visible')
})
