describe('Pagina Inicial', () => {
  it('Load pagina inicial', () => {
    cy.visit('http://127.0.0.1:5500/src/index/index.html')
    cy.contains('Front End DevOps')
  })

  it ('Navegar para a pagina sobre', () => {
    cy.visit('http://127.0.0.1:5500/src/index/index.html')
    cy.get('nav a').contains('Sobre').click()
  })
})