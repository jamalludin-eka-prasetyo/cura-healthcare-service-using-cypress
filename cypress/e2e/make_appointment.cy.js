describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.login('John Doe', 'ThisIsNotAPassword')
    })

    it('Make Valid Appointment', () => { 
        // validasi sudah di halaman 'Make Appointment'
        cy.url().should('include','/#appointment')
        cy.get('h2').should('contain','Make Appointment')
        cy.get('#combo_facility').should('be.visible')

        // mulai membuat appointment
        cy.get('#combo_facility').select('Seoul CURA Healthcare Center')

        cy.get('#chk_hospotal_readmission').check()
        cy.get('#chk_hospotal_readmission').should('be.checked') //validasi checkbox telah di check
        
        cy.get('.radio-inline [type="radio"]').check('Medicaid')
        cy.get('.radio-inline [type="radio"]').should('be.checked')

        cy.get('#txt_visit_date').type('02/01/1997')
        cy.get('#txt_visit_date').should('have.value', '02/01/1997')
        // cy.get('strong').click()
        cy.get('body').click({ force: true })

        cy.get('#txt_comment').type('Hello i have appoinment for doctor strange in 02/01/1997')
        cy.get('#txt_comment').should('have.value', 'Hello i have appoinment for doctor strange in 02/01/1997')

        cy.get('#btn-book-appointment').click()

        cy.url().should('include', '/appointment.php#summary')
        cy.get('h2').should('contain', 'Appointment Confirmation')

        cy.get('a[href="https://katalon-demo-cura.herokuapp.com/"]').click()

    })

    it('Make Invalid Appointment', () => { 
        // validasi sudah di halaman 'Make Appointment'
        cy.url().should('include','/#appointment')
        cy.get('h2').should('contain','Make Appointment')
        cy.get('#combo_facility').should('be.visible')

        // mulai membuat appointment
        cy.get('#combo_facility').select('Seoul CURA Healthcare Center')

        cy.get('#chk_hospotal_readmission').check()
        cy.get('#chk_hospotal_readmission').should('be.checked') //validasi checkbox telah di check
        
        cy.get('.radio-inline [type="radio"]').check('Medicaid')
        cy.get('.radio-inline [type="radio"]').should('be.checked')

        cy.get('#txt_comment').type('Hello i have appoinment for doctor strange in 02/01/1997')
        cy.get('#txt_comment').should('have.value', 'Hello i have appoinment for doctor strange in 02/01/1997')

        cy.get('#btn-book-appointment').click()
        cy.get('#txt_visit_date').then(($el) => {
            const msg = $el[0].validationMessage
            expect(msg).to.contain('Please fill out this field')
        })
    })
})