describe('Location', () => {
  beforeEach(() => {
    localStorage.setItem('tree.welcomeModal', 'close');
    cy.visit('');
    cy.get('.ui.menu > :nth-child(1)').click();
  });
});
