describe('Central de Atendimento', () => {
  it('verifica título', () => {
    cy.visit('./src/index.html')

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})