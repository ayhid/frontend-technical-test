describe('User Authentication', () => {
  it('as a user with valid credentials I should be able to authenticate', () => {
    cy.fixture('users').then((users) => {   
      // Login with user Thibault
      cy.login(users['thibaut']);     
    })
  });
});
