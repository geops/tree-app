describe('Projection mode', () => {
  beforeEach(() => {
    localStorage.setItem('tree.welcomeModal', 'close');
    cy.visit('');
    cy.get('.ui.menu > :nth-child(2)').click();
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
  const selectField = (name, item, force) => {
    cy.get(`[data-cypress=projectionForm${name}]`)
      .scrollIntoView()
      .click({ force });
    cy.get(`[data-cypress=projectionForm${name}] ${item}`).click({ force });
  };
  beforeEach(() => {
    localStorage.setItem('tree.welcomeModal', 'close');
    cy.visit('');
    cy.get('.ui.menu > :nth-child(2)').click();
    cy.get('[data-cypress=projectionModeFormButton]').click();
  });

  it('shows a recommendation', () => {
    selectField('ForestEcoregion', '.item:first-child');
    selectField('AltitudinalZone', '.item:last-child');
    selectField('ForestType', '.item:first-child');
    selectField('TargetAltitudinalZone', '.item:nth-child(2)', true);
    cy.get('[data-cypress=recommendationPane]')
      .scrollIntoView()
      .should('be.visible');
  });

  it('switches to transition location', () => {
    selectField('ForestEcoregion', '.item:first-child');
    selectField('AltitudinalZone', '.item:last-child');
    selectField('ForestType', '.item:first-child');
    cy.get(`[data-cypress=projectionFormTransition] .ui:last-child`).click({
      force: true,
    });
    selectField('TransitionForestType', '.item:first-child', true);
    selectField('TransitionAltitudinalZone', '.item:last-child', true);
    selectField('TargetAltitudinalZone', '.item:nth-child(2)', true);
    cy.get('[data-cypress=projectionResultMenuItem]').contains(/\w+\s\(\w+\)/);
  });
});

describe('Projection in map mode', () => {
  const selectField = (name, item, force) => {
    cy.get(`[data-cypress=projectionForm${name}]`)
      .scrollIntoView()
      .click({ force });
    cy.get(`[data-cypress=projectionForm${name}] ${item}`).click({ force });
  };
  beforeEach(() => {
    localStorage.setItem('tree.welcomeModal', 'close');
    cy.visit('/projection?mp=2654151%7C1205108&mv=18%7C2654195%7C1205068');
    cy.get('.ui.menu > :nth-child(2)').click();
  });

  it('shows a recommendation', () => {
    cy.get('[data-cypress=recommendationPane]', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');
  });

  it('shows a recommendation for a transition location', () => {
    cy.get(`[data-cypress=projectionFormTransition] .ui:last-child`, {
      timeout: 10000,
    }).click({
      force: true,
    });
    selectField('TransitionForestType', '.item:first-child', true);
    selectField('TransitionAltitudinalZone', '.item:last-child', true);
    cy.get('[data-cypress=recommendationPane]')
      .scrollIntoView()
      .should('be.visible');
  });
});
