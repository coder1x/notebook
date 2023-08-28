describe('Authorization', () => {
  beforeEach(() => {
    cy.visit('/registration');
    cy.get('[name=name]').as('inputName');
    cy.get('[name=password]').as('inputPassword');
    cy.get('[name=passwordTwo]').as('inputPasswordTwo');
  });

  it('field validation', () => {
    // проверка на корректность логина
    cy.get('@inputName').clear();
    cy.wait(100);
    cy.get('@inputName').type('tes', { delay: 100 });
    cy.wait(500);
    cy.get('@inputName').blur();
    cy.wait(100);
    cy.get('.text-field__message')
      .as('message')
      .should('have.text', 'Имя должно быть длиннее 3 символов');
    cy.wait(500);
    cy.get('@inputName').clear();
    cy.wait(100);
    cy.get('@inputName').type('test', { delay: 100 });
    cy.wait(500);
    cy.get('@message').should('have.text', 'Такой пользователь уже есть');
    cy.wait(500);
    cy.get('@inputName').type('1xwwq899', { delay: 100 });

    // проверка на корректность пароля
    cy.get('@inputPassword').type('123', { delay: 100 });
    cy.wait(500);
    cy.get('@inputPassword').blur();
    cy.wait(100);
    cy.get('@message').should('have.text', 'Пароль должен быть не короче 6 символов');
    cy.wait(100);
    cy.get('@inputPassword').clear();
    cy.wait(100);
    cy.get('@inputPassword').type('123456', { delay: 100 });
    cy.wait(500);
    cy.get('@inputPassword').blur();
    cy.wait(100);
    cy.get('@message').should('have.text', '');
    cy.wait(100);
    cy.get('@inputPasswordTwo').clear();
    cy.wait(100);
    cy.get('@inputPasswordTwo').type('1234x6', { delay: 100 });
    cy.wait(500);
    cy.get('@inputPasswordTwo').blur();
    cy.wait(100);
    cy.get('@message').should('have.text', 'Пароли не совпадают');
    cy.wait(100);
    cy.get('@inputPasswordTwo').clear();
    cy.wait(100);
    cy.get('@inputPasswordTwo').type('123456', { delay: 100 });
    cy.wait(500);
    cy.get('@inputPasswordTwo').blur();
    cy.wait(100);
    cy.get('@message').should('have.text', '');

    // капча
    let srcImg = '';
    cy.get('img')
      .invoke('attr', 'src')
      .then((src) => {
        srcImg = src ?? '';
      });
    cy.wait(100);
    cy.get('.captcha__reset-button').click();
    cy.wait(1000);
    cy.get('img')
      .invoke('attr', 'src')
      .then((src) => {
        expect(srcImg).not.equal(src);
      });
    cy.wait(100);
    cy.get('[name=captcha]').type('123456', { delay: 100 });
    cy.wait(500);
    cy.get('@message').should('have.text', 'Неверный код');
  });
});
