describe('Hamburger Menu', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Go to Home Page from Hamburger Menu', ()=> {
        cy.get('#menu-toggle').click()
        cy.get('.sidebar-brand > a').should('contain','CURA Healthcare')
        cy.get('.sidebar-nav > li:nth-child(3) > a').should('contain', 'Home').click()

        cy.url('include','/')
    })

    it('Login from Hamburger Menu', () => {
        cy.get('#menu-toggle').click()
        cy.get('.sidebar-nav > li:nth-child(4) > a').should('contain','Login').click()
        cy.url('include','/profile.php#login')
        
        cy.get('h2').should('contain','Login')

        cy.get('#txt-username').type('John Doe')
        cy.get('#txt-password').type('ThisIsNotAPassword')
        cy.get('#btn-login').click()
        cy.url().should('include','#appointment')
    })
})