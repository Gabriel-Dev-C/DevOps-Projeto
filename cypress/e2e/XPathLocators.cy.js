describe('XPath Locators', () => {

    it ('Number of options in navbar', () => {

        cy.visit("http://127.0.0.1:5500/src/index/index.html")
        cy.xpath('//*[@id="navbar"]/a').should('have.length', 3)
        cy.xpath('//*[@id="navbar"]/a[1]').should('contain', 'Cursos')
        cy.xpath('//*[@id="navbar"]/a[2]').should('contain', 'Sobre')
        cy.xpath('//*[@id="navbar"]/a[3]').should('contain', 'Contato')

    })

})