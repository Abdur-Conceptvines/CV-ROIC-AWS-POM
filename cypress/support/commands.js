import 'cypress-xpath';



export const waitForElement = (selector, maxAttempts = 12, interval = 10000, isXPath = false) => {
    let attempts = 0;

    function check() {
        return cy.get('body').then(($body) => {
            const elementExists = isXPath ? Cypress.$(document).xpath(selector).length > 0 : $body.find(selector).length > 0;
            
            if (elementExists) {
                return isXPath ? cy.xpath(selector): cy.get(selector);
            } 
            
            if (attempts < maxAttempts) {
                attempts++;
                cy.wait(interval);
                return check(); // Retry after waiting
            }
            
            throw new Error(`Element ${selector} not found after ${(maxAttempts * interval) / 1000} seconds`);
        });
    }

    return check();
};


 // **Polling Function for Templates Button**
 export function waitForTemplatesToBeClickable(attempts = 10) {
    if (attempts === 0) {
        throw new Error("Templates button did not become clickable within the time limit.");
    }

    cy.xpath("//button[@class='guideBtn']")
        .should('be.visible')
        .then(($btn) => {
            if ($btn.is(':disabled') || $btn.css('pointer-events') === 'none') {
                cy.wait(10000).then(() => waitForTemplatesToBeClickable(attempts - 1));
            } else {
                cy.wrap($btn).should('be.enabled').click();
            }
        });
}


// ✅ Select dropdown options

// Define function separately
export function selectDropdownOptions(dropdownSelector, dropdownIndex) {
    cy.get(dropdownSelector).eq(dropdownIndex).click();
 

    
    cy.get('.options-list input[type="checkbox"]').each(($el, index) => {
        if (index !== 0) { // Skip the first checkbox
            cy.wrap($el).then(($checkbox) => {
                if (!$checkbox.prop('checked')) {
                    cy.wrap($checkbox)
                        .invoke('removeAttr', 'readonly') // Remove readonly attribute
                        .check({ force: true }); // Force check the checkbox
                }
            });
        }
    });
  
}




// custom command for roi form  dropdown
Cypress.Commands.add("selectDropdown", (dropdownIndex, expectedText) => {
    cy.get('[role="combobox"]').eq(dropdownIndex).click(); // Open dropdown
    cy.contains('[role="option"]', expectedText, { timeout: 5000 }).click();
    cy.wait(2000); // Allow UI update

    // ✅ Correct Assertion - Verify the selected option
    cy.get('.css-1fdvzpi-singleValue').should('contain.text', expectedText);

});



// dashboard
Cypress.Commands.add('findEditButtonOnPages', (testData, maxPages = 5) => {
    let currentPage = 1;
  
    function tryNextPage() {
      cy.log(`🔍 Checking page ${currentPage}`);
  
      const $editBtn = Cypress.$(testData.buttons.editRoi);
  
      if ($editBtn.length > 0) {
        cy.get(testData.buttons.editRoi)
          .first()
          .click()
          .then(() => cy.log(`✅ Edit ROI found on page ${currentPage}`));
      } else if (currentPage < maxPages) {
        currentPage++;
        cy.contains('button', `${currentPage}`)
          .click()
          .then(() => {
            cy.wait(2000);
            tryNextPage();
          });
      } else {
        cy.log(`❌ Edit ROI not found within first ${maxPages} pages`);
      }
    }
  
    tryNextPage();
  });
  
  
// session storage
Cypress.Commands.add('setSessionStorageFromFixture', (fixtureFile) => {
    cy.fixture(fixtureFile).then((sessionData) => {
      Object.keys(sessionData).forEach((key) => {
        sessionStorage.setItem(key, sessionData[key]);
      });
    });
  });
  






//console.log(JSON.stringify(window.sessionStorage));allow pasting
//npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/results
// allure serve cypress/reports/allure-results
//npx cypress run --env allure=true


