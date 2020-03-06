const { info } = require('../../src/i18n/resources/de/translation.json');

describe('Info', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get('[data-cypress=welcomeModalGo]').click();
    cy.get('.ui.menu > :nth-child(3)').click();
  });

  it('shows title for impressum', () => {
    cy.get('.ui.accordion > :nth-child(11)').contains(info.impressumTitle);
  });

  it('shows impressum after clicking on title', () => {
    cy.get('.ui.accordion > :nth-child(11)').click();
    cy.get('.ui.accordion > .content.active').contains(info.impressum);
  });
});
