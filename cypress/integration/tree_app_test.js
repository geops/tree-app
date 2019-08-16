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

  it('checks the length of categroies for recommended tree species', () => {
    cy.get('.ui.stackable.Recommendation_grid__2wELJ')
      .children()
      .should('have.length', 3);
  });

  it('checks if the tab correctly toggles', () => {
    cy.get('.ui.borderless.menu')
      .contains('mässiger Klimawandel')
      .click()
      .prev()
      .click()
      .next()
      .next()
      .click();
  });

  it('checks if the today button is active by default', () => {
    cy.get('.ui.active.button').contains('Heute');
  });

  it('checks if recommended tree species for today scenario is valid ', () => {
    cy.get('.ui.stackable.Recommendation_grid__2wELJ')
      .children()
      .each($el => {
        if ($el[0].children[0].textContent === 'Fördern') {
          cy.get($el.children()[1]).contains('Fichte');
          cy.get($el.children()[1]).contains('Bergahorn');
          cy.get($el.children()[1]).contains('Vogelbeere');
        } else if ($el[0].children[0].textContent === 'Mitnehmen') {
          cy.get($el.children()[1]).contains('Hängebirke');
          cy.get($el.children()[1]).contains('Lärche');
          cy.get($el.children()[1]).contains('Salweide');
        } else if ($el[0].children[0].textContent === 'Reduzieren') {
          cy.get($el.children()[1]).contains('Alpenerle');
          cy.get($el.children()[1]).contains('Moorbirke');
        }
      });
  });

  it('checks if button correctly toggles to future scenario', () => {
    cy.get('.ui.button.Recommendation_button__1ecZM')
      .contains('Künftig')
      .click();
    cy.get('.ui.button.Recommendation_button__1ecZM')
      .not('.active')
      .contains('Heute');
  });

  it('checks if recommended tree species for future scenario is valid ', () => {
    cy.get('.ui.stackable.Recommendation_grid__2wELJ')
      .children()
      .each($el => {
        if ($el[0].children[0].textContent === 'Fördern') {
          cy.get($el.children()[1]).contains('Tanne');
        } else if ($el[0].children[0].textContent === 'Mitnehmen') {
          cy.get($el.children()[1]).contains('Grauerle');
          cy.get($el.children()[1]).contains('Gemeine Esche');
          cy.get($el.children()[1]).contains('Zitterpappel');
          cy.get($el.children()[1]).contains('Mehlbeere');
        } else if ($el[0].children[0].textContent === 'Reduzieren') {
          cy.get($el.children()[1]).should('not.have.descendants', '.item');
        }
      });
  });

  /* massiger for form mode not checked as starker and massiger will be merged in future version */
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
