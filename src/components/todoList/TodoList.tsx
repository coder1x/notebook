import { FC } from 'react';
import { TodoItem } from '@components/index';

type TodoData = {
  id: number;
  text: string;
};

type Props = {
  type: 'project' | 'task';
  status?: number;
  list: TodoData[];
  onCheckboxClick: (id: number, checked: boolean) => void;
  isChecked?: boolean;
};

const TodoList: FC<Props> = ({ list, onCheckboxClick, type, status = 1, isChecked = false }) => {
  let { length = 0 } = list;

  return (
    <ul className="todo-list">
      {list.map((item, index, array) => {
        const project = array[(length -= 1)];

        if (Object.keys(project).length !== 0) {
          const { id } = project;

          return (
            <TodoItem
              key={id}
              id={id}
              text={project.text}
              clickCheckbox={onCheckboxClick}
              isChecked={isChecked}
              type={type}
              status={status}
            />
          );
        }
        return <></>;
      })}
    </ul>
  );
};

export default TodoList;
