export default function addNote(numberOfRecords: number, text: string) {
  cy.contains('Добавить').click();
  cy.contains('[-]').click();
  cy.get('.editor__textarea').type(`${text} 1`);
  cy.contains('[-]').click();

  for (let i = 2; i <= numberOfRecords + 1; i += 1) {
    cy.get('@editorAdd').click();
    cy.wait(100);
    cy.get('.editor__textarea').type(`${text} ${i}`);
    cy.wait(100);
  }

  cy.get('@editorClose').click();
}
