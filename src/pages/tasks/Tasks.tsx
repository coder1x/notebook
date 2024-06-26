import { useEffect, useRef, MutableRefObject, FC, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Footer,
  Menu,
  Editor,
  Loading,
  TodoList,
  Tabs,
  Manager,
  ContextMenu,
} from '@components/index';
import {
  tokenState,
  tasksState,
  isLoadingTasksState,
  isAuthorizedState,
  errorCodeTasksState,
  projectTitleState,
} from '@store/selectors';
import { tasksActions, projectsActions, signInActions } from '@store/slices';
import { Throttle } from '@helpers/index';
import { EditorActions, ContextMenuActions } from './tasksType';
import removeDuplicates from './utils';

const Tasks: FC = () => {
  const { projectId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorCode = useSelector(errorCodeTasksState);
  const isAuthorized = useSelector(isAuthorizedState);
  const token = useSelector(tokenState);
  const tasks = useSelector(tasksState);
  const isLoading = useSelector(isLoadingTasksState);
  const title = useSelector(projectTitleState);

  const [isChecked, setIsChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  document.title = title || 'Менеджер задач';

  const tasksId: MutableRefObject<number[]> = useRef([]);
  const projectIdRef: MutableRefObject<string> = useRef('');
  const editorRef: MutableRefObject<null | EditorActions> = useRef(null);
  const menuRef: MutableRefObject<null | EditorActions> = useRef(null);
  const taskData: MutableRefObject<{ id: number; text: string } | null> = useRef(null);
  const contextMenuRef: MutableRefObject<null | ContextMenuActions> = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else if (projectIdRef.current !== projectId) {
      projectIdRef.current = projectId ?? '';
      dispatch(tasksActions.fetchTasksData(projectId ?? ''));
    }
  }, [dispatch, navigate, projectId, token]);

  useEffect(() => {
    if (isAuthorized) {
      return;
    }

    if (token) {
      dispatch(signInActions.setAuthorized(true));
    } else {
      dispatch(tasksActions.clearState());
      navigate('/');
    }
  }, [dispatch, isAuthorized, navigate, token]);

  useEffect(() => {
    switch (errorCode) {
      case 30:
        dispatch(signInActions.setAuthorized(false));
        dispatch(signInActions.removeSignInToken());
        break;

      default:
        break;
    }
  }, [dispatch, errorCode]);

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth <= 1098);
    };

    new Throttle(resize);

    resize();
  }, []);

  const closeMenu = () => {
    const menu = menuRef.current;

    if (menu) {
      menu.setConfig({
        ...menu.config,
        isActive: false,
      });
    }
  };

  const handleButtonAddClick = useCallback(() => {
    const editor = editorRef.current;

    closeMenu();

    if (editor) {
      editor.setConfig({
        text: '',
        title: 'Добавить задачу',
        type: 'addData',
        isActive: true,
      });
    }
  }, []);

  const handleButtonRemoveClick = useCallback(() => {
    const { current } = tasksId;

    if (!current.length) return;

    if (isChecked) setIsChecked(false);

    dispatch(tasksActions.fetchRemoveTask(current));
    tasksId.current = [];

    closeMenu();
  }, [dispatch, isChecked]);

  const handleButtonToTasksClick = useCallback(() => {
    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: tasksId.current,
        status: 1,
      })
    );
    tasksId.current = [];

    closeMenu();
  }, [dispatch]);

  const handleButtonRunClick = useCallback(() => {
    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: tasksId.current,
        status: 2,
      })
    );
    tasksId.current = [];

    closeMenu();
  }, [dispatch]);

  const handleButtonCompleteClick = useCallback(() => {
    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: tasksId.current,
        status: 3,
      })
    );
    tasksId.current = [];

    closeMenu();
  }, [dispatch]);

  const handleButtonTaskClick = useCallback(() => {
    closeMenu();

    navigate('/projects');
  }, [navigate]);

  const handleButtonExitClick = useCallback(() => {
    closeMenu();

    dispatch(projectsActions.clearState());
    dispatch(tasksActions.clearState());
    dispatch(signInActions.removeSignInToken());
  }, [dispatch]);

  const handleAddDataTask = useCallback(
    (text: string) => {
      dispatch(
        tasksActions.fetchAddTask({
          text: text.trim(),
          projectId: projectId ?? '',
        })
      );
    },
    [dispatch, projectId]
  );

  const handleCheckboxClick = useCallback((id: number, checked: boolean) => {
    if (checked) {
      tasksId.current.push(id);
    } else {
      tasksId.current = tasksId.current.filter((itemId) => itemId !== id);
    }
  }, []);

  const handleButtonAllClick = useCallback(() => {
    setIsChecked(tasks.current?.length ? !isChecked : false);
  }, [isChecked, tasks]);

  const handleTodoListClick = useCallback((item: { id: number; text: string }) => {
    const editor = editorRef.current;

    if (editor) {
      editor.setConfig({
        text: item.text,
        title: 'Просмотр задачи',
        type: 'viewData',
        isActive: true,
      });
    }
  }, []);

  const handleTodoItemContextMenu = useCallback((item: { id: number; text: string }) => {
    const contextMenu = contextMenuRef.current;

    if (contextMenu) {
      contextMenu.setIsActive(true);
    }

    taskData.current = item;
  }, []);

  const handleContextMenuView = useCallback(() => {
    if (!taskData.current) {
      return false;
    }

    const { id, text } = taskData.current;

    handleTodoListClick({
      id,
      text,
    });

    return true;
  }, [handleTodoListClick]);

  const handleContextMenuToTasksClick = useCallback(() => {
    if (!taskData.current) {
      return false;
    }

    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: removeDuplicates([...tasksId.current, taskData.current.id]),
        status: 1,
      })
    );
    tasksId.current = [];

    return true;
  }, [dispatch]);

  const handleContextMenuRunClick = useCallback(() => {
    if (!taskData.current) {
      return false;
    }

    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: removeDuplicates([...tasksId.current, taskData.current.id]),
        status: 2,
      })
    );
    tasksId.current = [];

    return true;
  }, [dispatch]);

  const handleContextMenuCompleteClick = useCallback(() => {
    if (!taskData.current) {
      return false;
    }

    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: removeDuplicates([...tasksId.current, taskData.current.id]),
        status: 3,
      })
    );
    tasksId.current = [];

    return true;
  }, [dispatch]);

  const handleContextMenuRemoveClick = useCallback(() => {
    const { current } = taskData;

    if (!current) {
      return false;
    }

    dispatch(tasksActions.fetchRemoveTask(removeDuplicates([...tasksId.current, current.id])));
    if (isChecked) setIsChecked(false);
    tasksId.current = [];
    return true;
  }, [dispatch, isChecked]);

  const handleContextMenuEditClick = useCallback(() => {
    const editor = editorRef.current;

    if (!taskData.current || !editor) {
      return false;
    }

    editor.setConfig({
      text: taskData.current.text,
      title: 'Редактирование задачи',
      type: 'editData',
      isActive: true,
    });

    return true;
  }, []);

  const handleUpdateTask = useCallback(
    (text: string) => {
      if (!taskData.current) {
        return false;
      }

      dispatch(
        tasksActions.fetchEditTask({
          id: taskData.current.id,
          text,
        })
      );

      return true;
    },
    [dispatch]
  );

  const totalCurrent = tasks.current?.length ?? 0;
  const totalInProgress = tasks.inProgress?.length ?? 0;
  const totalCompleted = tasks.completed?.length ?? 0;

  const menuButtons = useMemo(() => {
    return [
      {
        name: `${isMobile ? '➕ ' : ''}Добавить`,
        handler: handleButtonAddClick,
      },
      {
        name: `${isMobile ? '❌ ' : ''}Удалить`,
        handler: handleButtonRemoveClick,
      },
      {
        name: `${isMobile ? '✅ ' : ''}Выбрать всё`,
        handler: handleButtonAllClick,
      },
      {
        name: `${isMobile ? '📗 ' : ''}В задачи`,
        handler: handleButtonToTasksClick,
      },
      {
        name: `${isMobile ? '📙 ' : ''}Выполнить`,
        handler: handleButtonRunClick,
      },
      {
        name: `${isMobile ? '📕 ' : ''}Завершить`,
        handler: handleButtonCompleteClick,
      },
      {
        name: `${isMobile ? '📂 ' : ''}Проекты`,
        handler: handleButtonTaskClick,
      },
      {
        name: `${isMobile ? '↪ ' : ''}Выйти`,
        handler: handleButtonExitClick,
      },
    ];
  }, [
    handleButtonAddClick,
    handleButtonAllClick,
    handleButtonCompleteClick,
    handleButtonExitClick,
    handleButtonRemoveClick,
    handleButtonRunClick,
    handleButtonTaskClick,
    handleButtonToTasksClick,
    isMobile,
  ]);

  const contextMenuButtons = useMemo(() => {
    return [
      {
        name: '📄 Просмотр',
        handler: handleContextMenuView,
      },
      {
        name: '📝 Редактировать',
        handler: handleContextMenuEditClick,
      },
      {
        name: '❌ Удалить',
        handler: handleContextMenuRemoveClick,
      },
      {
        name: '📗 В задачи',
        handler: handleContextMenuToTasksClick,
      },
      {
        name: '📙 Выполнить',
        handler: handleContextMenuRunClick,
      },
      {
        name: '📕 Завершить',
        handler: handleContextMenuCompleteClick,
      },
    ];
  }, [
    handleContextMenuCompleteClick,
    handleContextMenuEditClick,
    handleContextMenuRemoveClick,
    handleContextMenuRunClick,
    handleContextMenuToTasksClick,
    handleContextMenuView,
  ]);

  const handleChangePosition = useCallback(
    (fromKey: string, toKey: string) => {
      const fromData = fromKey.split('|');
      const toData = toKey.split('|');

      dispatch(
        tasksActions.fetchTasksPosition({
          from: {
            id: Number(fromData[0]),
            position: Number(fromData[1]),
          },
          to: {
            id: Number(toData[0]),
            position: Number(toData[1]),
          },
        })
      );
    },
    [dispatch]
  );

  const tabs = useMemo(() => {
    return [
      {
        name: 'Задачи',
        content: (
          <TodoList
            list={tasks.current ?? []}
            onCheckboxClick={handleCheckboxClick}
            onChangePosition={handleChangePosition}
            onClick={handleTodoListClick}
            onContextMenu={handleTodoItemContextMenu}
            isChecked={isChecked}
            type="task"
            status={1}
          />
        ),
        index: 1,
        color: '#8CB758',
      },
      {
        name: 'Выполняются',
        content: (
          <TodoList
            list={tasks.inProgress ?? []}
            onCheckboxClick={handleCheckboxClick}
            onChangePosition={handleChangePosition}
            onClick={handleTodoListClick}
            onContextMenu={handleTodoItemContextMenu}
            isChecked={isChecked}
            type="task"
            status={2}
          />
        ),
        index: 2,
        color: '#f57c48',
      },
      {
        name: 'Завершённые',
        content: (
          <TodoList
            list={tasks.completed ?? []}
            onCheckboxClick={handleCheckboxClick}
            onChangePosition={handleChangePosition}
            onClick={handleTodoListClick}
            onContextMenu={handleTodoItemContextMenu}
            isChecked={isChecked}
            type="task"
            status={3}
          />
        ),
        index: 3,
        color: '#CA0B4A',
      },
    ];
  }, [handleCheckboxClick, handleTodoItemContextMenu, handleTodoListClick, isChecked, tasks]);

  return (
    <Manager title={title}>
      <Menu buttons={menuButtons} ref={menuRef} />
      <Tabs tabs={tabs} isLoading={isLoading} />
      <Footer
        type={'tasks'}
        total={totalCurrent + totalInProgress + totalCompleted}
        totalTasks={totalCurrent}
        totalPerformed={totalInProgress}
        totalCompleted={totalCompleted}
      />
      <Editor onAddData={handleAddDataTask} onUpdate={handleUpdateTask} ref={editorRef} />
      <ContextMenu buttons={contextMenuButtons} ref={contextMenuRef} />
    </Manager>
  );
};

export default Tasks;
