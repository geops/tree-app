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

describe('Projection in form mode', () => {
  const selectField = (name, item) => {
    cy.get(`[data-cypress=projectionForm${name}]`)
      .scrollIntoView()
      .click();
    cy.get(`[data-cypress=projectionForm${name}] ${item}`).click();
  };
  beforeEach(() => {
    cy.visit('');
    cy.get('[data-cypress=welcomeModalGo]').click();
    cy.get('[data-cypress=projectionModeFormButton]').click();
  });

  it('shows a recommendation', () => {
    selectField('ForestEcoregion', '.item:first-child');
    selectField('AltitudinalZone', '.item:last-child');
    selectField('ForestType', '.item:first-child');
    selectField('TargetAltitudinalZone', '.item:first-child');
    cy.get('[data-cypress=recommendationPane]')
      .scrollIntoView()
      .should('be.visible');
  });

  it('switches to transition location', () => {
    selectField('ForestEcoregion', '.item:first-child');
    selectField('AltitudinalZone', '.item:last-child');
    selectField('ForestType', '.item:first-child');
    cy.get(`[data-cypress=projectionFormTransition] .ui:last-child`).click();
    selectField('TransitionForestType', '.item:first-child');
    selectField('TransitionAltitudinalZone', '.item:last-child');
    selectField('TargetAltitudinalZone', '.item:first-child');
    cy.get('[data-cypress=projectionResultMenuItem]').contains(/\w+\s\(\w+\)/);
  });
});
