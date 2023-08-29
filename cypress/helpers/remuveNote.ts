export default function remuveNote() {
  cy.wait(100);
  cy.contains('Выбрать всё').click();
  cy.wait(200);
  cy.contains('Удалить').click();
  cy.wait(200);
}
