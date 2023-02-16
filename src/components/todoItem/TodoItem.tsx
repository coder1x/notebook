import { MouseEvent, FC, memo } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id: number;
  text: string;
  clickCheckbox: Function;
};

const TodoItem: FC<Props> = ({ id, text, clickCheckbox }) => {
  const handlerCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
    clickCheckbox(event.target);
  };

  return (
    <li className="todo-item">
      <label className="todo-item__input-wrapper">
        <input
          className="todo-item__input"
          type="checkbox"
          name={String(id)}
          onClick={handlerCheckboxClick}
        />
        <span className="todo-item__before"></span>
        <span className="visually-hidden">Выбрать элемент</span>
      </label>
      <Link tabIndex={0} className="todo-item__text" to={`/project/${id}`}>
        {text}
      </Link>
    </li>
  );
};

export default memo(TodoItem);
