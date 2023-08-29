import { authorization, addNote, remuveNote } from '../../helpers/index';

function checkFooterInfo(
  totalTasks: string,
  inTasks: string,
  performed: string,
  completed: string
) {
  cy.get('.footer__text-total').contains('Всего:').next().should('have.text', totalTasks);
  cy.get('.footer__text-total').contains('Задач:').next().should('have.text', inTasks);
  cy.get('.footer__text-total').contains('Выполняемых:').next().should('have.text', performed);
  cy.get('.footer__text-total').contains('Завершённых:').next().should('have.text', completed);
}

describe('Project tasks', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    authorization('test', '123456');
    cy.get('.editor__bottom-wrapper').contains('Добавить').as('editorAdd');
    cy.get('.editor__button-header').contains('X').as('editorClose');
    remuveNote();
    addNote(1, 'проект');
    cy.get('.todo-item__text').eq(0).click();
  });

  it('adding and removing task', () => {
    checkFooterInfo('0', '0', '0', '0');

    // добавление задач
    addNote(4, 'описание задачи');
    checkFooterInfo('4', '4', '0', '0');

    // выбрать все задачи и удалить
    cy.contains('Выбрать всё').click();
    cy.wait(100);
    cy.contains('Удалить').click();
    cy.wait(200);
    cy.get('.placeholder__text').eq(0).should('have.text', 'Нет записей');
    cy.get('.placeholder__text').eq(1).should('have.text', 'Нет записей');
    cy.get('.placeholder__text').eq(2).should('have.text', 'Нет записей');
    cy.wait(200);

    addNote(12, 'описание задачи');
    // удалить выбранные задачи
    cy.get('.todo-item__input-wrapper').eq(0).click();
    cy.get('.todo-item__input-wrapper').eq(3).click();
    cy.get('.todo-item__input-wrapper').eq(5).click();
    cy.wait(100);
    cy.contains('Удалить').click();
    cy.wait(200);
    checkFooterInfo('9', '9', '0', '0');

    // удалить задачу через контекстное меню
    cy.get('.todo-item__input-wrapper').eq(2).click();
    cy.get('.todo-item__input-wrapper').eq(4).click();
    cy.get('.todo-item__input-wrapper').eq(7).click();
    cy.get('.todo-item').eq(2).rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(2).click();
    cy.wait(200);
    checkFooterInfo('8', '8', '0', '0');
    cy.wait(100);
    remuveNote();
    cy.wait(200);
    checkFooterInfo('0', '0', '0', '0');
  });

  it('viewing and editing a task', () => {
    checkFooterInfo('0', '0', '0', '0');

    addNote(4, 'описание задачи');

    // просмотр задачи
    cy.get('.todo-item').eq(0).rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(0).click();
    cy.wait(100);
    cy.contains('Отмена').click();
    cy.wait(100);

    // редактирование задачи
    cy.get('.todo-item').eq(0).rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(1).click();
    cy.wait(100);
    cy.get('.editor__textarea').type(' *******');
    cy.wait(100);
    cy.contains('Применить').click();

    // открываем задачу что бы прочитать
    cy.get('.todo-item__text').eq(0).click();
    cy.wait(100);
    cy.contains('Отмена').click();
  });

  it('moving tasks', () => {
    addNote(6, 'описание задачи');

    // перемещение в выполняемые
    cy.get('.todo-item__input-wrapper').eq(0).click();
    cy.get('.todo-item__input-wrapper').eq(3).click();
    cy.wait(100);
    cy.contains('Выполнить').click();
    checkFooterInfo('6', '4', '2', '0');
    cy.wait(200);
    cy.get('.tab-button').contains('Выполняются').click();
    cy.wait(100);
    cy.get('.content-item_current').find('ins').eq(0).should('have.text', 'описание задачи 3');
    cy.get('.content-item_current').find('ins').eq(1).should('have.text', 'описание задачи 6');

    // перемещение в завершённые
    cy.get('.tab-button').contains('Задачи').click();
    cy.wait(100);
    cy.get('.todo-item__input-wrapper').eq(0).click();
    cy.get('.todo-item__input-wrapper').eq(3).click();
    cy.wait(100);
    cy.contains('Завершить').click();
    checkFooterInfo('6', '2', '2', '2');
    cy.get('.tab-button').contains('Завершённые').click();
    cy.wait(100);
    cy.get('.content-item_current').find('del').eq(0).should('have.text', 'описание задачи 1');
    cy.get('.content-item_current').find('del').eq(1).should('have.text', 'описание задачи 5');

    // из завершённых переместить обратно в задачи (контекстное меню)
    cy.get('.content-item_current').find('.todo-item__input-wrapper').eq(0).as('todoItem1').click();
    cy.wait(100);
    cy.get('@todoItem1').rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(3).click();
    cy.wait(100);
    checkFooterInfo('6', '3', '2', '1');
    cy.wait(100);

    // из выполняемых переместить в завершённые (контекстное меню)
    cy.get('.tab-button').contains('Выполняются').click();
    cy.get('.content-item_current').find('.todo-item__input-wrapper').eq(1).as('todoItem6').click();
    cy.wait(100);
    cy.get('@todoItem6').rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(5).click();
    cy.wait(100);
    checkFooterInfo('6', '3', '1', '2');
    cy.wait(100);

    // из задач переместить в выполняемые (контекстное меню)
    cy.get('.tab-button').contains('Задачи').click();
    cy.get('.content-item_current').find('.todo-item__input-wrapper').eq(1).as('todoItem4').click();
    cy.wait(100);
    cy.get('@todoItem4').rightclick();
    cy.wait(100);
    cy.get('.button__context-menu').eq(4).click();
    cy.wait(100);
    checkFooterInfo('6', '2', '2', '2');
    cy.wait(100);

    // выделить все и удалить
    remuveNote();
    checkFooterInfo('0', '0', '0', '0');
  });
});
