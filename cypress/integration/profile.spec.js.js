describe('Info', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should set the default profile in local storage on load', () => {
    expect(localStorage.getItem('tree.profile')).to.equal('ch');
  });

  it('should set the profile in local storage on change', () => {
    cy.get('[data-cypress=profileSwitcher]').click();
    cy.get('.field > .ui > .visible > :nth-child(2)').click().should(() => {
      expect(localStorage.getItem('tree.profile')).to.equal('be');
    }).then(() => {
      cy.get('.field > .ui > :nth-child(2)').contains('Bern');
    });
  });
});
