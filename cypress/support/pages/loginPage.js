class loginPage {
    // selector : 
    usernameField = '#txt-username'; 
    passwordField = '#txt-password'; 
    loginButton = '#btn-login'; 
    errorMessage = '.text-danger';

    // action
    visit() {
        cy.visit('/profile.php#login')
    }

    fillUsername(username){
        cy.get(this.usernameField).type(username)
    }

    fillPassword(password){
        cy.get(this.passwordField).type(password)
    }

    submitButton(){
        cy.get(this.loginButton).click()
    }

    assertionLoginFailed(){
        cy.get(this.errorMessage).should('contain','Login failed! Please ensure the username and password are valid.')
        cy.url().should('include','/profile.php#login')
    }

    assertionloginSuccess(){
        cy.url().should('include','#appointment')
    }

    assertLoginResult(){
        cy.get('body').then(($body) => {
          if($body.text().includes('Login failed!')) {
              cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.')
              cy.url().should('include','/profile.php#login') 
          } else {
              cy.url().should('include','#appointment') 
          }
        })
    }

    // helper 
    login(username, password){
        this.visit();
        this.fillUsername(username);
        this.fillPassword(password);
        this.submitButton();
    }
}

export default new loginPage();