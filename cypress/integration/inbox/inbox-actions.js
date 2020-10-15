describe('Testing Inbox actions', function() {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    });
    cy.visit('/auth/login');
    cy.get('[data-cy=EmailInput]').type(Cypress.env('ADMIN_EMAIL'));
    cy.get('[data-cy=PasswordInput]').type(Cypress.env('ADMIN_PASSWORD'));
    cy.get('[data-cy=LoginBtn]').click();
    cy.server().route('POST', '/api/inbox/**').as('getInboxes');
    cy.url().should('include', '/requetes');
    cy.wait('@getInboxes');
  })

  it('should list inboxes', function () {
    cy.get('[data-cy=InboxItem]').should('exist');
    cy.get('[data-cy=InboxItem]').should('have.length', 20);
    cy.get('[data-cy=PaginationInfo]').should('exist');
  });

  describe('Testing Inbox actions', function() {
    it('should show Intent', function () {
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntent]').invoke('text').then(Intent => {
        cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentBtn]').click();
        cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentSelector]').contains(Intent).should('exist');
        cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentBtn]').click();
      });
    });

    it('should filter Intents', function () {
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentBtn]').click();
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentCategorySelector]').click();
      cy.get('.mat-option').eq(1).invoke('text').then(category => {
        cy.get('.mat-option')
          .eq(1)
          .click()
        cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentSelector]').click();
        cy.get('.mat-option:not(.contains-mat-select-search)').contains(category).should('exist');
        cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true, multiple: true });
        cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentBtn]').click();
      });
    });

    it('should show discussion', function () {
        cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxDicussionBtn]').click();
        cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxPreview]').should('exist');
        cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxDicussionBtn]').click();
    });

    it('should show have two buttons', function () {
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxValidateBtn]').should('exist');
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxArchiveBtn]').should('exist');
    });

    it('should show the intent panel', function () {
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentBtn]').click();
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentEditBtn]').click();
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=IntentForm]').should('exist');
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentBackBtn]').click();
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentCreateBtn]').click();
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=IntentForm]').should('exist');
      cy.get('[data-cy=InboxItem]').first().find('[data-cy=InboxIntentBtn]').click();
    });
  })
})
