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

import Papa from 'papaparse'


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
})



Cypress.Commands.add('readCSV', (filePath) => {
  return cy.readFile(filePath).then((csvString) => {
    return new Promise((resolve) => {
      Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data); // hasilnya array of objects
        }
      });
    });
  });
});