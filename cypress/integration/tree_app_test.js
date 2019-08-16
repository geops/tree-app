import { isContext } from 'vm';

describe('visit and start', () => {
  it('visits the app in localhost', () => {
    cy.visit('http://localhost:3000/');
  });

  it('checks the rendering of the welcome screen', () => {
    cy.get('.actions > .ui').click();
  });
});

describe('Test form mode', () => {
  it('selects the form mode', () => {
    cy.get('.ui.buttons').click('right');
  });

  it('checks if the options are valid in the fields for the form mode', () => {
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
});

describe('Test projection Result', () => {
  context('Rendered projection result container', () => {
    it('checks the length of all valid categories', () => {
      cy.get('.ui.stackable.Recommendation_grid__2wELJ')
        .children()
        .should('have.length', 3);
    });

    it('checks if the tab for different climate scenario correctly toggles', () => {
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

    it('checks if button correctly toggles to future scenario', () => {
      cy.get('.ui.button.Recommendation_button__1ecZM')
        .contains('Künftig')
        .click();
      cy.get('.ui.button.Recommendation_button__1ecZM')
        .not('.active')
        .contains('Heute');
    });
  });

  context('starker Klimawandel scenario', () => {
    it('checks if recommended tree species for today is valid in starker Klimawandel', () => {
      cy.get('.ui.button.Recommendation_button__1ecZM')
        .contains('Heute')
        .click();
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

    it('checks if recommended tree species for future is valid in starker Klimawandel', () => {
      cy.get('.ui.button.Recommendation_button__1ecZM')
        .contains('Künftig')
        .click();
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
  });
});

context('Klima heute scenario', () => {
  it('checks if today and future toggler button is disabled', () => {
    cy.get('.ui.borderless.menu')
      .contains('Klima heute')
      .click();
    cy.get('.ui.button.Recommendation_button__1ecZM')
      .eq(0)
      .should('be.disabled');
    cy.get('.ui.button.Recommendation_button__1ecZM')
      .eq(1)
      .should('be.disabled');
  });

  it('checks for valid recommended forest type and tree species', () => {
    cy.get('.ui.borderless.menu')
      .contains('Klima heute')
      .click();
    cy.get('.ui.inverted.header').contains(
      '60 - Typischer Hochstauden-Fichtenwald',
    );
    cy.get('.ui.stackable.Recommendation_grid__2wELJ')
      .children()
      .each($el => {
        if ($el[0].children[0].textContent === 'Fichte') {
          cy.get($el.children()[1]).contains('Vogelbeere');
        } else if ($el[0].children[0].textContent === 'Mitnehmen') {
          cy.get($el.children()[1]).contains('Bergahorn');
          cy.get($el.children()[1]).contains('Alpenerle');
          cy.get($el.children()[1]).contains('Hängebirke');
          cy.get($el.children()[1]).contains('Moorbirke');
          cy.get($el.children()[1]).contains('Lärche');
          cy.get($el.children()[1]).contains('Salweide');
        } else if ($el[0].children[0].textContent === 'Reduzieren') {
          cy.get($el.children()[1]).should('not.have.descendants', '.item');
        }
      });
  });
});

/* massiger for form mode not checked as starker and massiger will be merged in future version */
describe('Test if the map mode is working', () => {
  context('checks the map rendering', () => {
    it('visits the app', () => {
      cy.visit('http://localhost:3000/');
    });

    it('checks the rendering of the welcome screen', () => {
      cy.get('.actions > .ui').click();
    });

    it('checks the map control component', () => {
      cy.get('.ol-zoom-in')
        .click()
        .click()
        .click();
      cy.get('.ol-zoom-out')
        .click()
        .click()
        .click();
    });

    it('checks if basemap renders correctly', () => {
      cy.get('.ui.MapBaseLayer_button__1K5SC.Button_button__2Ce79')
        .click()
        .contains('Luftbild')
        .click()
        .contains('Karte');
    });

    it('checks if all the layers renders correctly', () => {
      cy.get(
        '.ui.button.MapVectorLayer_dropdown__2lAu5.Dropdown_dropdown__3SDyp',
      ).click();
      cy.wait(1500);
      cy.get('.menu.transition.left.visible')
        .children()
        .each($el => {
          cy.wait(1500);
          cy.get($el).click({ force: true });
        });
    });
  });

  context(
    'checks the rendering of the projection result if forest type is clicked',
    () => {
      it('clicks on map', () => {
        cy.get('.ol-layer')
          .eq(0)
          .trigger('pointerdown', 130, 420, { force: true })
          .trigger('pointerup', 130, 420, { force: true });
      });
    },
  );
});
