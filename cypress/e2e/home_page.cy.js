
describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/')
    }) 

    it('Makesure H1 "CURA Healthcare Service" in home page', () => {
          // cy.visit('/')
        cy.get('h1').should('contain','CURA Healthcare Service')
      })


    it('Makesure Button "Make Appointment" available in home page and not disable', () => {
        // cy.visit('/')
        cy.get('#btn-make-appointment').should('contain','Make Appointment').click()

        cy.url().should('include','/profile.php#login')
        cy.get('.lead').should('contain','Please login to make appointment.')
    })

    it('Login with valid account', () => {
        cy.login('John Doe', 'ThisIsNotAPassword')
    })

    it('Login with invalid account', () => {
        cy.get('#btn-make-appointment').should('be.visible').and('contain.text','Make Appointment').click()
        
        cy.url().should('include','/profile.php#login')
        cy.get('.form-horizontal').within(() => {
        cy.get('input:first').should('have.attr', 'placeholder' , 'Username')
        cy.get('input:last').should('have.attr', 'placeholder' , 'Password')
        })

        cy.get('#txt-username').type('John Doea')
        cy.get('#txt-password').type('ThisIsNotAPassword')
        cy.get('#btn-login').click()

        cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.')
        cy.url().should('include','/profile.php#login')
    })
    
    it('Check valid user with if controller, it will using data-driven-testing later', () => {
        cy.get('#btn-make-appointment').should('be.visible').and('contain.text','Make Appointment').click()

        cy.url().should('include','/profile.php#login')
        cy.get('.form-horizontal').within(() => {
            cy.get('input:first').should('have.attr', 'placeholder' , 'Username')
            cy.get('input:last').should('have.attr', 'placeholder' , 'Password')
        })

        cy.get('#txt-username').type('John Doe')
        cy.get('#txt-password').type('ThisIsNotAPassword')
        cy.get('#btn-login').click()

        cy.get('body').then(($body) => { 
            if ($body.text().includes('Login failed!')) { 
                cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.')
                cy.url().should('include','/profile.php#login') 
                cy.log('login gagal') 
            } else { 
                cy.url().should('include','#appointment')
                cy.log('login berhasil') 
            } 
        })
    })
})
    