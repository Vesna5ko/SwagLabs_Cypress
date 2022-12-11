
import 'cypress-v10-preserve-cookie'
import "cypress-localstorage-commands"
import{BurgerButton} from '../../support/pom_objects/SideBar'
import{HeaderBtn} from '../../support/pom_objects/MainHeader'
import{AddItemBtns,RemoveItemBtns,Checkout} from '../../support/pom_objects/StoreItems'
import{CheckoutInfo,CheckoutBtn} from '../../support/pom_objects/CheckoutForm'

const user1= Cypress.env('user1')

describe('Store items',()=>{

    beforeEach('Visit our app.', ()=> {
        cy.visit('/'); 
        cy.preserveCookieOnce('session-username')
    
    cy.restoreLocalStorage()
   
    });
    afterEach(() => {
        cy.saveLocalStorage()
      })
    it('1. Login succesufully',()=>{
        cy.loginUser(user1.username, user1.password)
        cy.url().should('equal', 'https://www.saucedemo.com/inventory.html')
    })

    it('Sort items by price', ()=>{
        cy.loginUser(user1.username, user1.password)
        cy.get(HeaderBtn.sortBtn)
        .select('lohi')
        cy.get(HeaderBtn.sortBtn)
      .should('have.value', 'lohi')
    })
   
    it('Add item to cart',()=>{
        cy.loginUser(user1.username, user1.password)
        cy.get(AddItemBtns.addBackpack).click()
        cy.get(RemoveItemBtns.removeBackpacke).should("contain","Remove")
        cy.get(AddItemBtns.addBoltT).click()
        cy.get(RemoveItemBtns.rmoveBoltT).should("contain","Remove")
        cy.get(HeaderBtn.cartLink)
        .find('span')
        .should("contain","2")
          
    })
    it.only('Checkout', () => {
        cy.loginUser(user1.username, user1.password)
        cy.get(HeaderBtn.cartLink).click()
        cy.get(Checkout.checkoutBtn).click()

        cy.get(CheckoutInfo.name).type('Vesna')
        cy.get(CheckoutInfo.lastName).type('Petkovic')
        cy.get(CheckoutInfo.postalCode).type('11000')
        cy.get(CheckoutBtn.continue).click();
        cy.get(CheckoutBtn.finish).click();
    // confirm landing page
    cy.url().should('equal', 'https://www.saucedemo.com/checkout-complete.html')
  })
  
        
  it('Log out', () => {
    cy.loginUser(user1.username, user1.password)
    cy.logoutUser()
  })
        
          });
      
     
   

