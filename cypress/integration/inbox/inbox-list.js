describe('Testing Inbox list', function() {
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

  describe('Testing Inbox filters', function() {
    beforeEach(() => {
      cy.get('[data-cy=InboxFilterQuery]').clear();
      cy.get('[data-cy=InboxFilterStartDate]').clear();
      cy.get('[data-cy=InboxFilterEndDate]').clear();
      cy.wait(1000);
    })

    it('should list nothing with query', function() {
      cy.server().route('POST', '/api/inbox/**').as('getInboxes');
      cy.get('[data-cy=InboxFilterQuery]').type('êzlrpze^torkez^ktretre');
      cy.wait('@getInboxes');
      cy.get('[data-cy=InboxItem]').should('not.exist');
    })

    it('should list reset query with btn', function() {
      cy.server().route('POST', '/api/inbox/**').as('getInboxes');
      cy.get('[data-cy=InboxFilterQuery]').type('êzlrpze^torkez^ktretre');
      cy.get('[data-cy=InboxFilterQueryBtn]').click();
      cy.wait('@getInboxes');
      cy.get('[data-cy=InboxItem]').should('exist');
    })

    it('should init form with 5 statutes', function() {
      cy.get('[data-cy=InboxFilterStatutes]').click();
      cy.get('mat-option.mat-selected').should('have.length', 5);
      cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true });
    })

    it('should get inboxes between two dates', function() {
      cy.server().route('POST', '/api/inbox/**').as('getInboxes');
      cy.get('[data-cy=InboxFilterStartDate]').type('14/08/2020');
      cy.get('[data-cy=InboxFilterEndDate]').type('14/10/2020');
      cy.wait('@getInboxes');
      cy.get('[data-cy=InboxItem]').should('exist');
    })

    it('should get inboxes assigned', function() {
      cy.server().route('POST', '/api/inbox/**').as('getInboxes');
      cy.get('[data-cy=InboxAssignedSelector]').first().click();
      cy.get('.mat-option')
        .contains('End ToEnd admin')
        .click()
      cy.get('[data-cy=InboxFilterAssigned]').find('input').check({force: true});
      cy.wait('@getInboxes');
      cy.get('[data-cy=InboxItem]').should('exist');
    })
  })
})
