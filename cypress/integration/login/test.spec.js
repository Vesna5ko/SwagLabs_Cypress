import{loginPageErrors,loginPage} from '../../fixtures/constLoginPage'
import{LogInForm} from '../../support/pom_objects/LogInPage'
import{BurgerButton} from '../../support/pom_objects/SideBar'
const user1= Cypress.env('user1')
const user2= Cypress.env('user2')
describe('Login Page suite',()=>{

    beforeEach('Visit our application.', ()=> {
        cy.visit('/');
    });

    it('1. Login with empty username',()=>{
        
        cy.get(LogInForm.username).clear();
        cy.get(LogInForm.password).type(user1.password);
        cy.get(LogInForm.logInBtn).click();
        cy.get(LogInForm.logInError).should('have.text', loginPageErrors.usernameRequired);
        
    })
    it('2. Login with empty password',()=>{
        cy.get(LogInForm.username).type(user1.username);
        cy.get(LogInForm.password).clear();
        cy.get(LogInForm.logInBtn).click();
        cy.get('[data-test="error"]').should('have.text', loginPageErrors.passwordRequired);
    })
    it('3. Login with empty username and password',()=>{
        cy.get(LogInForm.username).clear();
        cy.get(LogInForm.password).clear();
        cy.get(LogInForm.logInBtn).click();
        cy.get(LogInForm.logInError).should('have.text', loginPageErrors.usernameRequired);
    })
    it('4. Login with wrong username',()=>{
        cy.loginUser(user2.username, user1.password)
        cy.get(LogInForm.logInError).should('have.text', loginPageErrors.signinError);
    })
    it('5. Login with wrong password',()=>{
        cy.loginUser(user1.username, user2.password)
        cy.get(LogInForm.logInError).should('have.text', loginPageErrors.signinError);
    })
    it('6. Login succesufully',()=>{
        cy.loginUser(user1.username, user1.password)
        cy.get('#header_container').contains('Products')
    })
    it('7. Logout',()=>{
        cy.loginUser(user1.username, user1.password)
        cy.get(BurgerButton.burgerBtn).click()
        cy.get(BurgerButton.logOutBtn).click({force: true})
        cy.get(LogInForm.logInBtn).contains(loginPage.logIn)
        
    })
})
