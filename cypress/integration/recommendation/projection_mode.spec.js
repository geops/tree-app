describe('Projection mode', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get('[data-cypress=welcomeModalGo]').click();
  });

  it('finds toggle buttons for projection mode', () => {
    cy.get('[data-cypress=projectionModeFormButton]').should('be.visible');
    cy.get('[data-cypress=projectionModeMapButton]').should('be.visible');
  });

  it('switches projection mode', () => {
    cy.get('[data-cypress=projectionModeFormButton]')
      .click()
      .should('have.class', 'active');
    cy.get('[data-cypress=projectionModeMapButton]')
      .click()
      .should('have.class', 'active');
  });
});
