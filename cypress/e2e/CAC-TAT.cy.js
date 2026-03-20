
describe('Central de Atendimento', () => {
  // Lesson 01 
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica título', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  // Lesson 02
  it('Preencher campos obrigatórios', () => {

    const longText = Cypress._.repeat('qualquer coisa, apenas teste', 15)

     cy.get('#firstName').type('Lua')
     cy.get('#lastName').type('Nova')
     cy.get('#email').type('lua.nova@gmail.com')
     cy.get('#phone').type('81999999999')
     cy.get('#open-text-area').type(longText, {delay: 0}) // extra 1 - Delay
     cy.get('.button[type="submit"]').click()
     cy.get('.success').should('be.visible')
  })

  // extra 2 - Error - Email
  it('Preencher com erro', () => {

    const longText = Cypress._.repeat('qualquer coisa, apenas teste', 15)

     cy.get('#firstName').type('Lua')
     cy.get('#lastName').type('Nova')
     cy.get('#email').type('lua.nova')
     cy.get('#phone').type('(81)99999-9999')
     cy.get('#open-text-area').type(longText, {delay: 0})
     cy.get('.button[type="submit"]').click()
     cy.get('.error').should('be.visible')
  })

  // extra 3 - Phone - Null
  it('Campo de telefone vazio, caso não seja numérico',() => {
     cy.get('#phone')                 
      .type('aaaaaa')
      .should('have.value', '')

  })

  // extra 4 - Required Phone
  it('Telefone obrigatório, não preenchido',() => {
    const longText = Cypress._.repeat('qualquer coisa, apenas teste', 15)

    cy.get('#firstName').type('Lua')
     cy.get('#lastName').type('Nova')
     cy.get('#email').type('lua.nova')
     cy.get('#phone-checkbox').click()
     cy.get('#open-text-area').type(longText, {delay: 0})
     cy.get('.button[type="submit"]').click()
     cy.get('.error').should('be.visible')
      
  })

  // extra 5 - Clear
  
  it('Preencher e limpar campos', () => {

    const longText = Cypress._.repeat('qualquer coisa, apenas teste', 15)

     cy.get('#firstName').type('Lua').should('have.value', 'Lua').clear().should('have.value', '')

     cy.get('#lastName').type('Nova').should('have.value', 'Nova').clear().should('have.value', '')

     cy.get('#email').type('lua.nova@gmail.com').should('have.value', 'lua.nova@gmail.com').clear().should('have.value', '')

     cy.get('#phone').type('81999999999').should('have.value', '81999999999').clear().should('have.value', '')

     cy.get('#open-text-area').type(longText, {delay: 0}) 
     cy.get('.button[type="submit"]').click()
     cy.get('.error').should('be.visible') // extra 6 - Error
  })

  // extra 7 - Custom Commands

  it('Enviar Formulário com comando costumizado', () => {
 
  const data = {
    firstName: 'Lua',
    lastName: 'Nova',
    email: 'lua.nova@gmail.com',
    text: 'teste'
  }

  cy.fillMandatoryFieldsAndSubmit(data)

  cy.get('.success').should('be.visible')
  })

  // extra 8 - Contains

 it('Preencher campos obrigatórios', () => {

    const longText = Cypress._.repeat('qualquer coisa, apenas teste', 15)

     cy.get('#firstName').type('Lua')
     cy.get('#lastName').type('Nova')
     cy.get('#email').type('lua.nova@gmail.com')
     cy.get('#phone').type('81999999999')
     cy.get('#open-text-area').type(longText, {delay: 0})
     cy.contains('button', 'Enviar').click()
     cy.get('.success').should('be.visible')
  })

  // Lesson 03 

  it('Campo suspenso', () =>{

    cy.get('#product').select('Blog', {delay: 100})
    cy.get('#product').select('Cursos', {delay: 100})
    cy.get('#product').select('Mentoria', {delay: 100})
    cy.get('#product').select('YouTube', {delay: 100})

  })

  // Extra 9 - Confirmation

  it('Campo suspenso', () =>{

    cy.get('#product').select('YouTube').should('have.value', 'youtube')
    
  })

  //lesson 04
  
  it('Tipo de Atendimento', () => {

    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')

  })

  // Extra 10 - Each and cy.wrap

  it('Tipo de Atendimento-extra', () => {

    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked')
        })
  })

 // Lesson 05 
  
 it('Marcar e Desmarcar Checkboxes', () => {

    cy.get('input[type="checkbox"][value="email"]').check().should('be.checked')
    cy.get('input[type="checkbox"][value="phone"]').check().should('be.checked')
    cy.get('input[type="checkbox"][value="email"]').uncheck().should('not.be.checked')
    cy.get('input[type="checkbox"][value="phone"]').uncheck().should('not.be.checked')

  })

  it('Marcar e Desmarcar Checkboxes Wrap', () => {

    cy.get('input[type="checkbox"]').each(typeOfContact => {
      cy.wrap(typeOfContact).check().should('be.checked')
    })
    cy.get('input[type="checkbox"]').each(typeOfContact => {
      cy.wrap(typeOfContact).uncheck().should('not.be.checked')
    })
   
  })

  // Lesson 06

  it('Fazer Upload de Arquivos', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json').should(input => { 
      expect(input[0].files[0].name).to.equal('example.json')
    }) 
  })

  // Extra 11 - drag and drop

  it('Fazer Upload de Arquivos - drag and drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => { 
      expect(input[0].files[0].name).to.equal('example.json')
    }) 
  }) 

  // Lesson 07

  it('Navegação por links', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank').click()

  })

  // Extra 12 - invoke

  it('Remove Atribute', () =>{
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT').should('be.visible')
  })

  
})
 
