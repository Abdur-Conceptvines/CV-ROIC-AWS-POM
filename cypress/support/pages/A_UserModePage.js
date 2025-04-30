class A_UserModePage {
    selectRoleCard(roleContentSelector, roleName) {
      cy.get(roleContentSelector)
        .contains(roleName)
        .click()
        .then(() => cy.log(`✅ Clicked on ${roleName} role card`));
    }
  }
  
  export default A_UserModePage;
  