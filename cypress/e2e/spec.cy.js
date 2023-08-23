import { getRemote } from 'mockttp'

const server = getRemote()

beforeEach(() => {
  cy.wrap(server.start(9999))
})

afterEach(() => {
  cy.wrap(server.stop())
})

it('renders the JSON', () => {
  cy.wrap(server.forGet("/jsonplaceholder/todos/1").always().thenJson(200, { userId: 2 }))
  cy.visit('/')
  cy.contains('UserID: 2').should('be.visible')
})

it('sends a correct request', () => {
  cy.wrap(server.forGet("/jsonplaceholder/todos/1").always().thenJson(200, { userId: 2 }))
    .as('mockEndpoint')
  cy.visit('/')
  cy.get('@mockEndpoint').then(mockEndpoint => {
    cy.wrap(mockEndpoint?.getSeenRequests()).then(reqs => {
      cy.wrap(reqs).should('have.length', 1)
      cy.wrap(reqs[0]).its('headers').should('have.property', 'accept')
    })
  })
})
