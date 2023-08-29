export default function authorization(login: string, password: string) {
  cy.visit('/');
  cy.get('[name=name]').as('inputName');
  cy.get('[name=password]').as('inputPassword');
  cy.wait(500);
  cy.get('@inputName').clear();
  cy.wait(500);
  cy.get('@inputPassword').clear();
  cy.wait(500);
  cy.get('@inputName').type(login, { delay: 100 });
  cy.wait(500);
  cy.get('@inputPassword').type(password, { delay: 100 });
  cy.wait(1000);
  cy.get('@inputPassword').blur();
  cy.wait(100);
  cy.get('[type=submit]').click();
  cy.wait(1000);
}
