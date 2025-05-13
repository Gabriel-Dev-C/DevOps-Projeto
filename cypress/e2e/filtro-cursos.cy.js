describe('Navegando na tabela da aba sobre', () => {
    beforeEach(() => {
        cy.visit('/Sobre.html')
    })

    it('Verificar ordenação reversa e alfabética na tabela', () => {
        // Clica no botão para exibir todas as entradas da tabela
        cy.get('select[name="tabelaDevOps_length"]').select('100') // Ajuste o seletor conforme necessário

        // Clica no cabeçalho da coluna "Categoria" para ordenar em ordem reversa
        cy.get('#tabelaDevOps thead th').contains('Categoria').click()

        // Captura os textos das células da coluna "Categoria" e verifica a ordem reversa
        cy.get('#tabelaDevOps tbody tr td.categoria').then(($cells) => {
            const categorias = [...$cells]
                .map(cell => cell.innerText.trim()) // Remove espaços extras
                .filter(text => text !== '') // Remove células vazias

            console.log('Categorias capturadas (ordem reversa):', categorias)

            // Verifica se as categorias estão em ordem reversa
            const categoriasReversas = [...categorias].sort((a, b) => b.localeCompare(a))
            console.log('Categorias esperadas (ordem reversa):', categoriasReversas)

            expect(categorias).to.deep.equal(categoriasReversas)
        })

        // Clica novamente no cabeçalho da coluna "Categoria" para ordenar em ordem alfabética
        cy.get('#tabelaDevOps thead th').contains('Categoria').click()

        // Captura os textos das células da coluna "Categoria" e verifica a ordem alfabética
        cy.get('#tabelaDevOps tbody tr td.categoria').then(($cells) => {
            const categorias = [...$cells]
                .map(cell => cell.innerText.trim()) // Remove espaços extras
                .filter(text => text !== '') // Remove células vazias

            console.log('Categorias capturadas (ordem alfabética):', categorias)

            // Verifica se as categorias estão em ordem alfabética
            const categoriasOrdenadas = [...categorias].sort((a, b) => a.localeCompare(b))
            console.log('Categorias esperadas (ordem alfabética):', categoriasOrdenadas)

            expect(categorias).to.deep.equal(categoriasOrdenadas)
        })
    })
})