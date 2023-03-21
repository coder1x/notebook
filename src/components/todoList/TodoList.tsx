import { FC, memo } from 'react';

import { TodoItem, Placeholder } from '@components/index';

import Props from './todoListType';

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

  return (
    <ul className="todo-list">
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
                onContextMenu={onContextMenu}
                onClick={onClick}
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

export default memo(TodoList);
