import { MouseEvent } from 'react';

type Props = {
  index: number;
  id: number;
  text: string;
  clickProject: (id: number) => void;
  clickCheckbox: Function;
};

function TodoItem(props: Props) {
  const handlerCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
    props.clickCheckbox(event.target);
  };

  return (
    <li className="todo-item">
      <span className="todo-item__number">[ {props.index} ]</span>
      <label className="todo-item__input-wrapper">
        <input
          className="todo-item__input"
          type="checkbox"
          name={String(props.id)}
          onClick={handlerCheckboxClick}
        />
        <span className="todo-item__before"></span>
        <span className="visually-hidden">Выбрать элемент</span>
      </label>
      <p tabIndex={0} className="todo-item__text" onClick={() => props.clickProject(props.id)}>
        {props.text}
      </p>
    </li>
  );
}

export default TodoItem;
