describe('Authorization', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[name=name]').as('inputName');
    cy.get('[name=password]').as('inputPassword');
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
    cy.get('@message').should('have.text', '');

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

    // проверка на существование логина
    cy.get('@inputName').clear();
    cy.wait(100);
    cy.get('@inputName').type('test09897865765454434X', { delay: 100 });
    cy.wait(500);
    cy.get('@message').should('have.text', 'Такого пользователя нет');
    cy.wait(500);
    cy.get('@inputName').clear();
    cy.wait(100);

    // проверка авторизации с неверным паролем
    cy.get('@inputName').type('test', { delay: 100 });
    cy.wait(500);
    cy.get('@inputPassword').clear();
    cy.wait(500);
    cy.get('@inputPassword').type('13456222222', { delay: 100 });
    cy.wait(1000);
    cy.get('@inputPassword').blur();
    cy.wait(100);
    cy.get('[type=submit]').click();
    cy.wait(500);
    cy.get('.message-form__text').should('have.text', 'Ошибка авторизации');
  });

  it('correct authorization', () => {
    cy.wait(500);
    cy.get('@inputName').clear();
    cy.wait(500);
    cy.get('@inputPassword').clear();
    cy.wait(500);
    cy.get('@inputName').type('test', { delay: 100 });
    cy.wait(500);
    cy.get('@inputPassword').type('123456', { delay: 100 });
    cy.wait(1000);
    cy.get('@inputPassword').blur();
    cy.wait(100);
    cy.get('[type=submit]').click();
    cy.wait(1000);
    cy.contains('button', 'Выйти');
  });
});
