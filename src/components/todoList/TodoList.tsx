import { FC, memo } from 'react';

import { TodoItem, Placeholder } from '@components/index';

import Props from './todoListType';

const TodoList: FC<Props> = ({
  list,
  onCheckboxClick,
  onChangePosition,
  onClick,
  onContextMenu,
  type,
  status = 1,
  isChecked = false,
}) => {
  const { length = 0 } = list;

  const cloneList = list.concat().sort((a, b) => b.position - a.position);

  return (
    <ul className="todo-list">
      {length === 0 ? (
        <li className="todo-list__empty">
          <Placeholder text="Нет записей" />
        </li>
      ) : (
        cloneList.map((item) => {
          // const project = array[(length -= 1)];

          if (Object.keys(item).length !== 0) {
            const { id, position, text } = item;

            return (
              <TodoItem
                key={id}
                id={id}
                position={position}
                text={text}
                clickCheckbox={onCheckboxClick}
                onChangePosition={onChangePosition}
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
