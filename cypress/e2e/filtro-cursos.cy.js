describe('Navegando na tabela de cursos', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/src/index/cursos/cursos.html')
    })

    it ('Filtrar cursos por nome', () => {
        cy.get('input[type=search]').type('Ciências da computação')
        cy.get('table tbody tr').should('have.length', 1)
    })
})