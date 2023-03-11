import { FC, MouseEvent } from 'react';
import { TodoItem, Placeholder } from '@components/index';

type TodoData = {
  id: number;
  text: string;
};

type Props = {
  type: 'project' | 'task';
  status?: number;
  list: TodoData[];
  onCheckboxClick: (id: number, checked: boolean) => void;
  onClick?: (data: string) => void;
  onContextMenu?: (item: { id: number; text: string }) => void;
  isChecked?: boolean;
};

const TodoList: FC<Props> = ({
  list,
  onCheckboxClick,
  onClick,
  onContextMenu,
  type,
  status = 1,
  isChecked = false,
}) => {
  let { length = 0 } = list;

  const handleTodoItemClick = (event: MouseEvent<HTMLUListElement>) => {
    const element = event.target as HTMLElement;

    if (element.classList.contains('js-todo-item__text')) {
      if (onClick instanceof Function) {
        onClick(element.innerHTML);
      }
    }
  };

  const handleTodoItemContextMenu = (item: { id: number; text: string }) => {
    if (onContextMenu instanceof Function) {
      onContextMenu(item);
    }
  };

  return (
    <ul className="todo-list" onClick={handleTodoItemClick}>
      {length === 0 ? (
        <li className="todo-list__empty">
          <Placeholder text="Нет записей" />
        </li>
      ) : (
        list.map((item, index, array) => {
          const project = array[(length -= 1)];

          if (Object.keys(project).length !== 0) {
            const { id } = project;

            return (
              <TodoItem
                key={id}
                id={id}
                text={project.text}
                clickCheckbox={onCheckboxClick}
                onContextMenu={handleTodoItemContextMenu}
                isChecked={isChecked}
                type={type}
                status={status}
              />
            );
          }
          return <></>;
        })
      )}
    </ul>
  );
};

export default TodoList;
