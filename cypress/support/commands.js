// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (username, password) =>{
    cy.visit('/')
    cy.get('#btn-make-appointment').should('be.visible').and('contain.text','Make Appointment').click()
    cy.url().should('include','/profile.php#login')
    
    cy.get('.form-horizontal').within(() => {
    cy.get('input:first').should('have.attr', 'placeholder' , 'Username')
    cy.get('input:last').should('have.attr', 'placeholder' , 'Password')
    })

    cy.get('#txt-username').type(username)
    cy.get('#txt-password').type(password)
    cy.get('#btn-login').click()
    cy.url().should('include','#appointment')


    // TERE UI
    // cy.url().should('include','/login')

    // cy.get('#username').type(username)
    // cy.get('#password').type(password)
    // cy.get('button').should('contain','Login').click()
    // cy.url().should('include','#appointment')
     
})