// Extra 7 - Custom Commands

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data =>{
     cy.get('#firstName').type(data.firstName)
     cy.get('#lastName').type(data.lastName)
     cy.get('#email').type(data.email)
     cy.get('#open-text-area').type(data.text) 
     cy.get('.button[type="submit"]').click()
})

// Faker - Random

const {faker} = require("@faker-js/faker")


Cypress.Commands.add('createUser', () =>{
    const fakerFirstName = faker.person.firstName()
    Cypress.env('randomUser').firstName=fakerFirstName

    const fakerLastName = faker.person.lastName()
    Cypress.env('randomUser').lastName=fakerLastName

    const fakerEmail = faker.internet.email(Cypress.env('randomUser').firstName, Cypress.env('randomUser').lastName)
    Cypress.env('randomUser').email=fakerEmail

    const fakerText = faker.lorem.text()
    Cypress.env('randomUser').text=fakerText

    return fakerFirstName, fakerLastName, fakerEmail, fakerText
}) 