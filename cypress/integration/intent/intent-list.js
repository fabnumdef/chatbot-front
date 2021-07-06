describe('Testing Intent list', function() {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    });
    cy.visit('/auth/login');
    cy.get('[data-cy=EmailInput]').type(Cypress.env('ADMIN_EMAIL'));
    cy.get('[data-cy=PasswordInput]').type(Cypress.env('ADMIN_PASSWORD'));
    cy.get('[data-cy=LoginBtn]').click();
    cy.url().should('include', '/requetes');
    cy.intercept('POST', '/api/intent/**').as('getIntents');
    cy.visit('/connaissances');
    cy.url().should('include', '/connaissances');
    cy.wait('@getIntents');
  })

  it('should list intents', function () {
    cy.get('[data-cy=IntentItem]').should('exist');
    cy.get('[data-cy=IntentItem]').should('have.length', 20);
    cy.get('[data-cy=PaginationInfo]').should('exist');
  });

  describe('Testing Intent filters', function() {
    beforeEach(() => {
      cy.get('[data-cy=IntentFilterQuery]').clear();
      // cy.get('[data-cy=IntentFilterCategory]').clear();
      cy.wait(1000);
    })

    it('should list nothing with query', function() {
      cy.intercept('POST', '/api/intent/**').as('getIntents');
      cy.get('[data-cy=IntentFilterQuery]').type('êzlrpze^torkez^ktretre');
      cy.wait('@getIntents');
      cy.get('[data-cy=IntentItem]').should('not.exist');
    })

    it('should list reset query with btn', function() {
      cy.intercept('POST', '/api/intent/**').as('getIntents');
      cy.get('[data-cy=IntentFilterQuery]').type('êzlrpze^torkez^ktretre');
      cy.get('[data-cy=IntentFilterQueryBtn]').click();
      cy.wait('@getIntents');
      cy.get('[data-cy=IntentItem]').should('exist');
    })

    it('should get intents with errors', function() {
      cy.intercept('POST', '/api/intent/**').as('getIntents');
      cy.get('[data-cy=IntentFilterErrorBtn]').first().click();
      cy.wait('@getIntents');
      cy.get('[data-cy=IntentItem]').should('exist');
      cy.get('[data-cy=IntentFilterErrorBtn]').first().click();
    })
  })
})
