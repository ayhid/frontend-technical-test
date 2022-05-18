// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', (user) => {
  cy.visit('/');
  cy.get('[data-test=login-button]').click();
  cy.url().should('include', '/auth/signin');
  // Login with user Thibault
  Cypress.log({ displayName: `Testing with User ${user.nickname}` })
  cy.get('#input-nickname-for-credentials-provider').type(user.nickname)
  cy.get('button').click();
  cy.get('[data-test=conversations-title]').should('be.visible').should('have.text', 'Mes conversations');
  
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
