import loginPage from "../support/pages/loginPage";
const users = Cypress.env('users');
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

    
//     users.forEach((user) => {
//     it(`Login test for user :  ${user.username}`, () => {
//         cy.visit('/profile.php#login')
//         cy.get('#txt-username').type(user.username)
//         cy.get('#txt-password').type(user.password)
//         cy.get('#btn-login').click()
//         cy.get('body').then(($body) => {
//           if($body.text().includes('Login failed!')) {
//               cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.')
//               cy.url().should('include','/profile.php#login') 
//               cy.log('login gagal menggunakan username', user.username , 'dan password', user.password) 
//           } else {
//               cy.url().should('include','#appointment')
//               cy.log('login berhasil menggunakan username: ', user.username , 'dan password: ', user.password) 
//           }
//         })
//     });
//   });

    // Login menggunakan data dinamis dan POP ( page object pattern, check di cypress/support/pages/loginPage.js)
    users.forEach((user) => {
      it(`Login test for user : ${user.username}`, () => {
        cy.log('login menggunakan username', user.username , 'dan password', user.password) 
        loginPage.login(user.username, user.password)
        loginPage.assertLoginResult();
      });
    });  

})