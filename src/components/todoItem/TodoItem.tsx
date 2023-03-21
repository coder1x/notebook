import { FC, KeyboardEvent, memo, useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import Props from './todoItemType';

const TodoItem: FC<Props> = ({
  id,
  text,
  clickCheckbox,
  onContextMenu,
  onClick,
  type,
  isChecked = false,
  status,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handlerCheckboxChange = () => {
    setChecked(!checked);
    clickCheckbox(id, !checked);
  };

  const handleElementClick = (element: HTMLElement) => {
    if (element.classList.contains('js-todo-item__text')) {
      if (onClick instanceof Function) {
        onClick({
          id,
          text,
        });
      }
    }
  };

  const handleTodoItemContextMenu = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    if (onContextMenu instanceof Function) {
      onContextMenu({
        id,
        text,
      });
    }
  };

  const handleTodoItemClick = (event: MouseEvent<HTMLLIElement>) => {
    const element = event.target as HTMLElement;
    handleElementClick(element);
  };

  const handleTodoItemKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    const element = event.target as HTMLElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      handleElementClick(element);
    }
  };

  useEffect(() => {
    if (checked !== isChecked) {
      setChecked(isChecked);
      clickCheckbox(id, isChecked);
    }
  }, [isChecked]);

  return (
    <li
      className="todo-item"
      onContextMenu={handleTodoItemContextMenu}
      onClick={handleTodoItemClick}
      onKeyDown={handleTodoItemKeyDown}>
      <label className="todo-item__input-wrapper">
        <input
          className="todo-item__input visually-hidden"
          type="checkbox"
          name={String(id)}
          onChange={handlerCheckboxChange}
          checked={checked}
          tabIndex={-1}
        />
        <span className="todo-item__before"></span>
        <span className="visually-hidden">Выбрать элемент</span>
      </label>
      {type === 'project' ? (
        <Link tabIndex={0} className="todo-item__text js-todo-item__text" to={`/project/${id}`}>
          {`📂 ${text}`}
        </Link>
      ) : status === 3 ? (
        <del tabIndex={0} className="todo-item__text js-todo-item__text">
          {text}
        </del>
      ) : (
        <ins
          tabIndex={0}
          className="todo-item__text js-todo-item__text todo-item__text_no-decoration">
          {text}
        </ins>
      )}
    </li>
  );
};

export default memo(TodoItem);
