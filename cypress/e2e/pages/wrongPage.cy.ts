describe('Wrong address', () => {
  it('page 404', () => {
    cy.visit('/435435');
    cy.get('.wrong-page__header').should('have.text', 'Такой страницы не существует');
    cy.wait(2000);
    cy.get('.wrong-page__text').should('have.text', '404');
    cy.get('.wrong-page__icon-wrapper_visible').find('svg').should('exist');
    cy.get('.button').click();
    cy.url().should('eq', 'http://localhost:3030/');
  });
});
