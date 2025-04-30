import A_UserModePage from '../support/pages/A_UserModePage';
import B_RoiEntryPage from '../support/pages/B_RoiEntryPage';
import C_BusinessPage from '../support/pages/C_BusinessPage';
import D_ReportPage from '../support/pages/D_ReportPage';
import 'cypress-xpath';

const UserModePage = new A_UserModePage();
const RoiEntryPage = new B_RoiEntryPage();
const BusinessPage = new C_BusinessPage();
const ReportPage = new D_ReportPage();

describe('ROIFLOW_DIY_Basic', () => {
  beforeEach(() => {
    cy.fixture('roiData.json').then((testData) => {
        cy.visit(testData.url, { failOnStatusCode: false });

        cy.setSessionStorageFromFixture('sessionStorage.json');

        cy.reload();
        cy.visit(testData.homeUrl)
            .its('document.readyState')
            .should('eq', 'complete')
            .then(() => cy.log('✅ Navigated to Home URL:', testData.homeUrl));
    });
});

  it('should complete the full ROI flow for DIY Basic', () => {
    cy.fixture('roiData.json').then((testData) => {
      // Page 1
      UserModePage.selectRoleCard(testData.roleContent, 'DIY - Basic');

      // Page 2
      RoiEntryPage.verifyPageLoaded();
      RoiEntryPage.fillDropdowns(testData.dropdowns.selectors, testData.dropdowns.values);
      cy.wait(5000);
      RoiEntryPage.selectDropdownOptionsFromJSON('dropdown.json', 'testCase0.0');
      RoiEntryPage.clickCalculateButton(testData.buttons.calculate);
      cy.wait(5000);
     
      // Page 3
      BusinessPage.clickCalculateButton(testData.buttons.calculate);
      //page 4
      ReportPage.clickDownloadButton();
      ReportPage.clickSalesCoach();
      ReportPage.selectROI(testData.roiSelectionIndex);
      ReportPage.typeQuery(testData.roiQuery);
      ReportPage.clickGenerateProposal(testData.buttons.generateProposal);
      cy.wait(5000);
      ReportPage.selectReasoningEngine('Amazon Nova Pro');
      ReportPage.clickDraftEmail(testData.buttons.draftEmail);

      cy.log("🎉 Data-driven test passed successfully!");
      cy.log("🎉 ROIFLOW_DIY_Basic test passed successfully!");
    });
  });
});
