import { FC, KeyboardEvent, memo, useState, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Drag, Drop } from '@helpers/index';
import Props from './todoItemType';

const TodoItem: FC<Props> = ({
  id,
  position,
  text,
  clickCheckbox,
  onContextMenu,
  onChangePosition,
  onClick,
  type,
  isChecked = false,
  status,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    clickCheckbox(id, !checked);
  };

  const handleElementClick = (element: HTMLElement) => {
    if (!element.classList.contains('js-todo-item__text')) return;

    onClick?.({
      id,
      text,
    });
  };

  const handleTodoItemContextMenu = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    onContextMenu?.({
      id,
      text,
    });
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
    setChecked(isChecked);
    clickCheckbox(id, isChecked);
  }, [clickCheckbox, id, isChecked]);

  const handleDrop = (dragKey: string, dropKey: string) => {
    if (dragKey === dropKey) return;

    onChangePosition(dragKey, dropKey);
  };

  return (
    <li
      className="todo-item"
      onContextMenu={handleTodoItemContextMenu}
      onClick={handleTodoItemClick}
      onKeyDown={handleTodoItemKeyDown}>
      <Drag
        className="todo-item__drag"
        data={{
          key: `${id}|${position}`,
        }}>
        <Drop dropKey={`${id}|${position}`} onDrop={handleDrop}>
          <button className={'button-dnd'}>::</button>
        </Drop>
      </Drag>
      <label className="todo-item__input-wrapper">
        <input
          className="todo-item__input visually-hidden"
          type="checkbox"
          name={String(id)}
          onChange={handleCheckboxChange}
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
