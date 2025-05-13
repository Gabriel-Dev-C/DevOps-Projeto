describe('XPath Locators', () => {

    it ('Number of options in navbar', () => {

        cy.visit("http://127.0.0.1:5500/index/index.html")
        cy.xpath('//*[@id="navbar"]/a').should('have.length', 4)
        cy.xpath('//*[@id="navbar"]/a[1]').should('contain', 'Menu')
        cy.xpath('//*[@id="navbar"]/a[2]').should('contain', 'CI/CD')
        cy.xpath('//*[@id="navbar"]/a[3]').should('contain', 'Sobre')
        cy.xpath('//*[@id="navbar"]/a[4]').should('contain', 'Contato')

    })

})