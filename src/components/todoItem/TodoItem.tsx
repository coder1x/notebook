import { MouseEvent, FC } from 'react';

type Props = {
  index: number;
  id: number;
  text: string;
  clickProject: (id: number) => void;
  clickCheckbox: Function;
};

const TodoItem: FC<Props> = ({ index, id, text, clickProject, clickCheckbox }) => {
  const handlerCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
    clickCheckbox(event.target);
  };

  return (
    <li className="todo-item">
      <span className="todo-item__number">[ {index} ]</span>
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
      <p tabIndex={0} className="todo-item__text" onClick={() => clickProject(id)}>
        {text}
      </p>
    </li>
  );
};

export default TodoItem;
