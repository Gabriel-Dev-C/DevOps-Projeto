describe('Pagina Inicial', () => {
  it('Load pagina inicial', () => {
    cy.visit('http://127.0.0.1:5500/src/index/index.html')
    cy.contains('Faculdade Tech')
  })

  it ('Navegar para a pagina de cursos', () => {
    cy.visit('http://127.0.0.1:5500/src/index/index.html')
    cy.get('nav a').contains('Cursos').click()
  })
})