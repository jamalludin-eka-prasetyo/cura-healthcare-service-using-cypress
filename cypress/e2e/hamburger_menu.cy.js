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
        cy.readCSV('cypress/fixtures/Login_data.csv').then((users) => {
            users.forEach((user) => {
                cy.get('#menu-toggle').click()
                cy.get('.sidebar-nav > li:nth-child(4) > a').should('contain','Login').click()
                cy.url('include','/profile.php#login')
                
                cy.get('h2').should('contain','Login')
        
                cy.get('#txt-username').type(user.username)
                cy.get('#txt-password').type(user.password)
                cy.get('#btn-login').click()
                
                cy.get('body').then(($body) => { 
                    if ($body.text().includes('Login failed!')) { 
                        cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.')
                        cy.url().should('include','/profile.php#login') 
                        cy.log('login gagal menggunakan username', user.username , 'dan password', user.password) 
                    } else { 
                        cy.url().should('include','#appointment')
                        cy.log('login berhasil menggunakan username: ', user.username , 'dan password: ', user.password) 
                    } 
                })
            })
        })


    })
})