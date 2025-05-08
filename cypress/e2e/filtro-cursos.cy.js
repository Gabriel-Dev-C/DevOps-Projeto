describe('Navegando na tabela de cursos', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/src/index/cursos/cursos.html')
    })

    it('Ordenar cursos por ordem alfabética', () => {
        // Clica no cabeçalho da coluna "Curso" para ordenar
        cy.get('table thead th').contains('Curso').click()

        // Captura os textos das células da coluna "Curso"
        cy.get('table tbody tr td:first-child').then(($cells) => {
            const cursos = [...$cells].map(cell => cell.innerText)

            // Verifica se os cursos estão em ordem alfabética
            const cursosOrdenados = [...cursos].sort((a, b) => a.localeCompare(b))
            expect(cursos).to.deep.equal(cursosOrdenados)
        })
    })
})