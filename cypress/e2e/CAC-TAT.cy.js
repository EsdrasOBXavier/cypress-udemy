describe('Central de Atendimento', () => {
   beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica título', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preencher campos obrigatórios', () => {
     cy.get('#firstName').type('Lua')
     cy.get('#lastName').type('Nova')
     cy.get('#email').type('lua.nova@gmail.com')
     cy.get('#phone').type('(81)99999-9999')
     cy.get('#open-text-area').type('Isto é apenas um teste')
     cy.get('.button[type="submit"]').click()
     cy.get('.success').should('be.visible')
  })
})

