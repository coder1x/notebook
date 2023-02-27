import { FC, memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id: number;
  text: string;
  clickCheckbox: Function;
  isChecked?: boolean;
};

const TodoItem: FC<Props> = ({ id, text, clickCheckbox, isChecked = false }) => {
  const [checked, setChecked] = useState(isChecked);

  const handlerCheckboxChange = () => {
    setChecked(!checked);
    clickCheckbox(id, !checked);
  };

  useEffect(() => {
    if (checked !== isChecked) {
      setChecked(isChecked);
      clickCheckbox(id, isChecked);
    }
  }, [isChecked]);

  return (
    <li className="todo-item">
      <label className="todo-item__input-wrapper">
        <input
          className="todo-item__input visually-hidden"
          type="checkbox"
          name={String(id)}
          onChange={handlerCheckboxChange}
          checked={checked}
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
