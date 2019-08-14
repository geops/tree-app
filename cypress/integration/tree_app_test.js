describe('Test if UI gets actived in form mode', () => {
  it('visits the app', () => {
    cy.visit('http://localhost:3000/');
  });

  it('starts the app', () => {
    cy.get('.actions > .ui').click();
  });

  it('selects the form mode', () => {
    cy.get('.ui.buttons').click('right');
  });

  it('populates the fields', () => {
    cy.get('.field').click();
    cy.get('.visible.menu.transition').scrollTo('bottom', { duration: '2000' });
    cy.contains('60 - Typischer Hochstauden-Fichtenwald')
      .scrollIntoView()
      .click();

    cy.get('.field')
      .contains('label', 'Standortsregion')
      .next()
      .click();
    cy.get('.visible.menu.transition').click('top');

    cy.get('.field')
      .contains('label', 'Höhenstufe')
      .next()
      .click();
    cy.get('.visible.menu.transition').click('top');

    cy.get('.field')
      .contains('label', 'Höhenstufe Zukunft')
      .next()
      .click();

    cy.get('.visible.menu.transition')
      .scrollTo('top', { duration: '2000' })
      .contains('hochmontan Reliktareal der Tanne')
      .scrollIntoView()
      .click();
  });

  it('checks the recommended forest type', () => {
    cy.get('.ProjectionResult_container__3Kn3X').click();
    cy.get('.ui.inverted.header').contains(
      '50 - Typischer Hochstauden-Ta-Fi-Wald',
    );
  });

  it('checks the list of recommended tree species for all 4 categories', () => {
    cy.get('.column .ui.inverted.header')
      .contains('Fördern')
      .get('.ui.list.Recommendation_list__2ut8U')
      .find('item')
      .should('have.length', 3);
  });
});

// describe('Test if the map mode is working', () => {
//   it('visits the app', () => {
//     cy.visit('http://localhost:3000/');
//   });

//   it('zoom the map and click on Standorttyp', () => {
//     cy.get('.ol-zoom-in')
//       .click()
//       .click()
//       .click();
//     // cy.get('.ol-overlaycontainer-stopevent').click()
//   });

//   it('checks if all layers are rendering', () => {
//     cy.get('.vertical.menu').each(($el, index, $list) => {
//       // $el is a wrapped jQuery element
//       console.log($el.children.item);
//     });
//   });
// });
