class appointmentPage {
    // define selector for make appointment
    facilityDropdown = '#combo_facility';
    readmissionCheckBox = '#chk_hospotal_readmission';
    healtcareRadioButton ='input[name="programs"]';
    visitDate = '#txt_visit_date';
    commentField = '#txt_comment';
    submitButton = '#btn-book-appointment';
    confirmationHeader = 'h2';
    homeLink = 'a[href="https://katalon-demo-cura.herokuapp.com/"]';

    // define selector for makesure that data is correct
    facilityConfirmation = '#facility';
    readmissionConfirmation = '#hospital_readmission';
    healthcareConfirmation = '#program';
    visitDateConfirmation = '#visit_date'
    commentConfirmation = '#comment'

    // action
    validateOnAppointmentPage(){
        cy.url().should('include','/#appointment')
        cy.get(this.confirmationHeader).should('contain','Make Appointment')
        cy.get(this.facilityDropdown).should('be.visible')
    }

    selectFacility(facility){
        cy.get(this.facilityDropdown).select(facility)
    }

    setReadmissionCheckBox(status){
        if (status == 'check'){
            cy.get(this.readmissionCheckBox).check()
            cy.get(this.readmissionCheckBox).should('be.checked') //validasi checkbox telah di check
          } else { 
            cy.get(this.readmissionCheckBox).uncheck()
          }
    }

    selectHealthCareProgram(program){
        if(program == "Medicare"){
            cy.get(this.healtcareRadioButton).check('Medicare')
        } else if(program == "Medicaid"){
            cy.get(this.healtcareRadioButton).check('Medicaid')
        } else if(program == "None"){
            cy.get(this.healtcareRadioButton).check('None')
        }
    }

    setDateVisit(date){
        cy.get(this.visitDate).type(date)
        cy.get(this.visitDate).should('have.value', date)
        cy.get('body').click({force:true})
    }

    setComment(comment){
        cy.get(this.commentField).type(comment)
        cy.get(this.commentField).should('have.value', comment)
    }

    submitAppointmentButton(){
        cy.get(this.submitButton).click()
    }

    validateConfirmation(facility, readmission, healthcare, date, comment){ 
        cy.url().should('include', '/appointment.php#summary')
        cy.get(this.confirmationHeader).should('contain', 'Appointment Confirmation');
        cy.get(this.facilityConfirmation).should('contain', facility)

        if(readmission === 'check'){
            cy.get(this.readmissionConfirmation).should('contain','Yes')
        } else {
            cy.get(this.readmissionConfirmation).should('contain','No')
        }

        if(healthcare == "Medicare"){
            cy.get(this.healthcareConfirmation).should('contain', 'Medicare')
        } else if(healthcare == "Medicaid"){
            cy.get(this.healthcareConfirmation).should('contain', 'Medicaid')
        } else if(healthcare == "None"){
            cy.get(this.healthcareConfirmation).should('contain', 'None')
        }
        // cy.get(this.healthcareConfirmation).should('contain', healthcare)
        cy.get(this.visitDateConfirmation).should('contain', date)
        cy.get(this.commentConfirmation).should('contain',comment)
    } 
    
    backToHome(){ 
        cy.get(this.homeLink).click()
    }
}

export default new appointmentPage();