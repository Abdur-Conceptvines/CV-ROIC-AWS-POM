// Page3.js
import { waitForElement } from '../commands';



class C_BusinessPage {
    
    clickCalculateButton(selector) {
      waitForElement(selector)
        .click()
        .then(() => cy.log('✅  Calculate button from roi page clicked'));
    }
  }
  
  export default C_BusinessPage;
  