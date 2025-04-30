import {waitForElement, waitForTemplatesToBeClickable } from '../commands';

class D_ReportPage {
 
    clickDownloadButton() {
      waitForElement('.download-button')
        .should('be.visible')
        .click()
        .then(() => cy.log('✅ view report button clicked'));
    }
  
    clickSalesCoach() {
      cy.contains('a', 'Sales Coach')
        .should('be.visible')
        .click()
        .then(() => cy.log('✅ Sales Coach clicked'));
    }
  
    selectROI(index) {
      waitForElement('input[type="radio"][name="sources"]')
        .eq(index)
        .should('exist')
        .click()
        .then(() => cy.log('✅ ROI Selection clicked'));
    }
  
    typeQuery(text) {
      cy.xpath("//textarea[@placeholder='Start Typing....']")
        .should('be.visible')
        .type(text)
        .then(() => cy.log('✅ Query typed into textarea'));
    }
  
    clickGenerateProposal(selector) {
      waitForTemplatesToBeClickable();
      cy.xpath(selector)
        .should('be.visible')
        .click()
        .then(() => cy.log('✅ Generate Proposal clicked'));
    }
  
    selectReasoningEngine(optionText) {
      cy.get('.css-1xc3v61-indicatorContainer').click();
      cy.get('div').contains(optionText).should('be.visible');
      cy.contains('div', optionText).click()
        .then(() => cy.log(`✅ Engine mode changed to ${optionText}`));
    }
  
    clickDraftEmail(selector) {
      cy.xpath(selector)
        .should('be.visible')
        .click()
        .then(() => cy.log('✅ Draft Email clicked'));
  
      waitForTemplatesToBeClickable();
    }
  }
  
  export default D_ReportPage;
  