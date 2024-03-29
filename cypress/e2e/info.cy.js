const { info } = require('../../src/i18n/resources/de/translation.json');

describe('Info', () => {
  beforeEach(() => {
    localStorage.setItem('tree.welcomeModal', 'close');
    cy.visit('');
    cy.get('[data-cypress=cookie-consent-ok-btn]').click();
    cy.get('.ui.menu > :nth-child(3)').click();
  });

  it('shows title for about', () => {
    cy.get('.ui.accordion > :nth-child(1)').contains(info.aboutTitle);
  });

  it('shows text after clicking on title', () => {
    cy.get('.ui.accordion > :nth-child(1)').click();
    cy.get('.ui.accordion > .content.active').contains('Tree App');
  });
});
