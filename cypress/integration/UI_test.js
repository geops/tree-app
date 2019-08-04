

describe('Test if UI gets actived in form mode', function(){
    it('visits the app',function(){
        cy.visit('http://localhost:3000/')
    })

    it('selects the form mode',function(){
        cy.get('.ui.buttons').click('right')
    })

    it('populates the fields',function(){
        cy.get('.field').click()
        cy.get('.visible.menu.transition').scrollTo('bottom',{ duration: '2000' })
        cy.contains('60 - Typischer Hochstauden-Fichtenwald').scrollIntoView().click()

        cy.get('.field').contains('label','Waldstandortsregion').next().click()
        cy.get('.visible.menu.transition').click('top')

        cy.get('.field').contains('label','Höhenstufe').next().click()
        cy.get('.visible.menu.transition').click('top')
    })
})

describe('Test if the map mode is working',function(){
    it('visits the app',function(){
        cy.visit('http://localhost:3000/')
    })

    it('zoom the map and click on Standorttyp',function(){
        cy.get('.ol-zoom-in').click().click().click()
        // cy.get('.ol-overlaycontainer-stopevent').click()
    })

    it('checks if all layers are rendering',function(){
        cy.get('.vertical.menu')
        .each(($el, index, $list) => {
            // $el is a wrapped jQuery element
            console.log($el.children.item)
          })
    })
})