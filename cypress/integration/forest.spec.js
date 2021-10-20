import { info } from '@geops/tree-lib';

const data1 = info('forestType', '1');
const data2 = info('forestType', '2');

describe('Forest type comparison and description', () => {
  beforeEach(() => {
    localStorage.setItem('tree.welcomeModal', 'close');
  });

  it('opens modal for description', () => {
    cy.visit('?ftd=1&ftm=d');
    cy.get('[data-cypress=forestTypeModal] .header').should(
      'include.text',
      data1.de,
    );
  });

  it('opens modal for comparison', () => {
    cy.visit('?ftc=1&ftm=c');
    cy.get('[data-cypress=forestTypeModal]').should('include.text', data1.de);
  });

  it('LU: switches from association sub type to forest type', () => {
    cy.visit('?ftd=1&ftm=d&p=lu');
    cy.get(
      '[data-cypress="forestTypeDescription.lu.associationsMenuItem"]',
    ).click();
    cy.get(
      '[data-cypress="forestTypeDescription.lu.associationsTabSubGroups"] > :nth-child(2)',
    ).click();
    cy.get('[data-cypress=forestTypeModal] .header').should(
      'include.text',
      data2.de,
    );
  });
});
