import { authorization, addNote, remuveNote } from '../../helpers/index';

describe('Project manager', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    authorization('test', '123456');
    cy.get('.editor__bottom-wrapper').contains('Добавить').as('editorAdd');
    cy.get('.editor__button-header').contains('X').as('editorClose');
    remuveNote();
  });

  it('adding and removing entries', () => {
    // добавить записи
    addNote(4, 'проект');
    cy.get('.footer__number-total').should('have.text', '4');

    // выбрать все записи и удалить
    cy.contains('Выбрать всё').click();
    cy.wait(100);
    cy.contains('Удалить').click();
    cy.wait(200);
    cy.get('.placeholder__text').should('have.text', 'Нет записей');
    cy.wait(200);

    addNote(12, 'проект');
    // удалить выбранные записи
    cy.get('.todo-item__input-wrapper').eq(0).click();
    cy.get('.todo-item__input-wrapper').eq(3).click();
    cy.get('.todo-item__input-wrapper').eq(5).click();
    cy.wait(100);
    cy.contains('Удалить').click();
    cy.wait(200);
    cy.get('.footer__number-total').should('have.text', '9');

    // удалить запись через контекстное меню
    cy.get('.todo-item__input-wrapper').eq(2).click();
    cy.get('.todo-item__input-wrapper').eq(4).click();
    cy.get('.todo-item__input-wrapper').eq(7).click();
    cy.get('.todo-item').eq(2).rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(2).click();
    cy.wait(200);
    cy.get('.footer__number-total').should('have.text', '8');
    cy.wait(100);
    remuveNote();
    cy.wait(200);
    cy.get('.footer__number-total').should('have.text', '0');
  });

  it('viewing and editing a record', () => {
    addNote(4, 'проект');

    // просмотр проекта
    cy.get('.todo-item').eq(0).rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(0).click();
    cy.wait(100);
    cy.contains('Отмена').click();
    cy.wait(100);

    // редактирование проекта
    cy.get('.todo-item').eq(0).rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(1).click();
    cy.wait(100);
    cy.get('.editor__textarea').type(' *******');
    cy.wait(100);
    cy.contains('Применить').click();

    // переходим в менеджер задач и возвращаемся обратно
    cy.get('.todo-item__text').eq(0).click();
    cy.wait(300);
    cy.contains('Проекты').click();
  });
});
