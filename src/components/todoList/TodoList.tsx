import { FC } from 'react';
import { TodoItem } from '@components/index';

type TodoData = {
  id: number;
  text: string;
};

type Props = {
  list: TodoData[];
  onCheckboxClick: (object: HTMLInputElement) => void;
};

const TodoList: FC<Props> = ({ list, onCheckboxClick }) => {
  let { length = 0 } = list;

  return (
    <ul className="todo-list">
      {list.map((item, index, array) => {
        const project = array[(length -= 1)];

        if (Object.keys(project).length !== 0) {
          const { id } = project;

          return <TodoItem key={id} id={id} text={project.text} clickCheckbox={onCheckboxClick} />;
        }
        return <></>;
      })}
    </ul>
  );
};

export default TodoList;
