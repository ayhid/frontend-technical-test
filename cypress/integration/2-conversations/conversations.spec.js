describe('User Conversations', () => {
  it('as a user with valid credentials I should be able to see a list of my conversations', () => {
    cy.fixture('users').then((users) => {
      // Login with user Thibault
      cy.login(users['thibaut']);
      cy.get('[data-test=conversations-list] li').should('have.length.above', 0);
    })
  });
  it('as a user with valid credentials I should be able to see a messages for a given conversation', () => {
    cy.fixture('users').then((users) => {
      // Login with user Thibault
      cy.login(users['thibaut']);
      cy.get('button[data-test=conversation-item]')
        .first()
        .click();
        cy.get('[data-test=conversation-title]').should('be.visible').should('not.be.empty');
        cy.get('[data-test=messages-list]').should('be.visible');
      cy.get('[data-test=messages-list] > div').should('not.be.empty');
    })
  });
});
