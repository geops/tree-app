const { location } = require('../../src/i18n/resources/de/translation.json');

describe('Location', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get('[data-cypress=welcomeModalGo]').click();
    cy.get('.ui.menu > :nth-child(1)').click();
  });

  it('shows message "under construction"', () => {
    cy.get('.ui.big.message').contains(location.underConstruction);
  });
});
