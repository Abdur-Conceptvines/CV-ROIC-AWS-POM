// Page2.js
import { waitForElement } from '../commands';



class B_RoiEntryPage {
    verifyPageLoaded() {
      cy.url().should('include', '/roi-entry')
        .then(() => cy.log('✅ Page loaded successfully!'));
    }
  
    fillDropdowns(dropdownSelectors, dropdownValues) {
      cy.get('.dropdowns', { timeout: 15000 }).should('be.visible').then(() => {
        dropdownSelectors.forEach((selector, index) => {
          waitForElement(selector).type(dropdownValues[index]);
          cy.log(`✅ Typed '${dropdownValues[index]}' in '${selector}'`);
        });
      });
    }
  
    selectDropdownOptionsFromJSON(file, key) {
      cy.fixture(file).then((data) => {
        const testCaseData = data[key];
        if (testCaseData) {
          testCaseData.forEach(({ dropdown, expectedText }) => {
            cy.selectDropdown(dropdown, expectedText)
              .should('contain.text', expectedText);
          });
        }
      });
    }
  
    clickCalculateButton(selector) {
      waitForElement(selector)
        .click()
        .then(() => cy.log('✅  Calculate button from roi page clicked'));
    }
  }
  
  export default B_RoiEntryPage;
  