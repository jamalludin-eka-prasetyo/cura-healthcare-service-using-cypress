// Login dynamic with 1 testcase for all user
// describe('Dynamic Test Login', () => {
//   it('Runs login from CSV data', () => {
//     cy.readCSV('cypress/fixtures/Login_data.csv').then((users) => {
//       users.forEach((user) => {
//             //Login
//             cy.visit('/profile.php#login')
//             cy.get('#txt-username').clear().type(user.username)
//             cy.get('#txt-password').clear().type(user.password)
//             cy.get('#btn-login').click()
//             // cy.url().should('include','#appointment')

//             cy.get('body').then(($body) => {
//                 if($body.text().includes('Login failed!')) {
//                     cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.')
//                     cy.url().should('include','/profile.php#login') 
//                     cy.log('login gagal menggunakan username', user.username , 'dan password', user.password) 
//                 } else {
//                     cy.url().should('include','#appointment')
//                     cy.log('login berhasil menggunakan username: ', user.username , 'dan password: ', user.password) 
//                 }
//             })
//       });
//     });
//   });
// });


// login dynamic for 1 user 1 test case
const users = Cypress.env('users');

describe('Dynamic Test Login', () => {
  users.forEach((user) => {
    it(`Login test for user :  ${user.username}`, () => {
        cy.visit('/profile.php#login')
        cy.get('#txt-username').type(user.username)
        cy.get('#txt-password').type(user.password)
        cy.get('#btn-login').click()
        cy.get('body').then(($body) => {
          if($body.text().includes('Login failed!')) {
              cy.get('.text-danger').should('contain', 'Login failed! Please ensure the username and password are valid.')
              cy.url().should('include','/profile.php#login') 
              cy.log('login gagal menggunakan username', user.username , 'dan password', user.password) 
          } else {
              cy.url().should('include','#appointment')
              cy.log('login berhasil menggunakan username: ', user.username , 'dan password: ', user.password) 
          }
        })
    });
  });
});
