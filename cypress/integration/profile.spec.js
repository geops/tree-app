describe('Info', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get('[data-cypress=cookie-consent-ok-btn]').click();
  });

  it('should set the default profile in local storage on load', () => {
    expect(localStorage.getItem('tree.profile')).to.equal('ch');
  });

  it('should set the profile in local storage on change', () => {
    cy.get('[data-cypress=profileSwitcher]').click();
    cy.get('[data-cypress=luOption]')
      .click()
      .should(() => {
        expect(localStorage.getItem('tree.profile')).to.equal('lu');
      })
      .then(() => {
        cy.get('[data-cypress=profileSwitcher]').first().contains('Luzern');
      });
  });
});
