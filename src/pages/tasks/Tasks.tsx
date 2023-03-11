import { useEffect, useRef, MutableRefObject, FC, useCallback, useState } from 'react';
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
} from '@store/selectors';
import { tasksActions, signInActions } from '@store/slices';

type EditorActions = {
  setIsActive: (data: boolean) => void;
  setTextData: (data: string) => void;
  setEditorType: (data: string) => void;
};

type ContextMenuActions = {
  setIsActive: (data: boolean) => void;
};

const Tasks: FC = () => {
  const { projectId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorCode = useSelector(errorCodeTasksState);
  const isAuthorized = useSelector(isAuthorizedState);
  const token = useSelector(tokenState);
  const tasks = useSelector(tasksState);
  const isLoading = useSelector(isLoadingTasksState);

  const [isChecked, setIsChecked] = useState(false);

  document.title = 'Менеджер проектов';

  const tasksId: MutableRefObject<number[]> = useRef([]);
  const projectIdRef: MutableRefObject<string> = useRef('');
  const editorRef: MutableRefObject<null | EditorActions> = useRef(null);

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

  const handleButtonAddClick = () => {
    const editor = editorRef.current;

    if (editor) {
      editor.setEditorType('addData');
      editor.setIsActive(true);
    }
  };

  const handleButtonRemoveClick = () => {
    dispatch(tasksActions.fetchRemoveTask(tasksId.current));
    tasksId.current = [];
  };

  const handleButtonToTasksClick = () => {
    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: tasksId.current,
        status: 1,
      })
    );
    tasksId.current = [];
  };

  const handleButtonRunClick = () => {
    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: tasksId.current,
        status: 2,
      })
    );
    tasksId.current = [];
  };

  const handleButtonCompleteClick = () => {
    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: tasksId.current,
        status: 3,
      })
    );
    tasksId.current = [];
  };

  const handleButtonTaskClick = () => {
    navigate('/projects');
  };

  const handleButtonExitClick = () => {
    dispatch(tasksActions.clearState());
    dispatch(signInActions.removeSignInToken());
  };

  const handleAddDataTask = (text: string) => {
    dispatch(
      tasksActions.fetchAddTask({
        text: text.trim(),
        projectId: projectId ?? '',
      })
    );
  };

  const handleCheckboxClick = useCallback((id: number, checked: boolean) => {
    if (checked) {
      tasksId.current.push(id);
    } else {
      tasksId.current = tasksId.current.filter((itemId) => itemId !== id);
    }
  }, []);

  const handleButtonAllClick = () => {
    setIsChecked(!isChecked);
  };

  const handleTodoListClick = (data: string) => {
    const editor = editorRef.current;

    if (editor) {
      editor.setEditorType('viewData');
      editor.setTextData(data);
      editor.setIsActive(true);
    }
  };

  const handleTodoItemContextMenu = (item: { id: number; text: string }) => {
    const contextMenu = contextMenuRef.current;

    if (contextMenu) {
      contextMenu.setIsActive(true);
    }

    taskData.current = item;
  };

  const handleContextMenuView = () => {
    if (!taskData.current) {
      return false;
    }

    handleTodoListClick(taskData.current.text);

    return true;
  };

  const handleContextMenuToTasksClick = () => {
    if (!taskData.current) {
      return false;
    }

    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: [taskData.current.id],
        status: 1,
      })
    );
    tasksId.current = [];

    return true;
  };

  const handleContextMenuRunClick = () => {
    if (!taskData.current) {
      return false;
    }

    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: [taskData.current.id],
        status: 2,
      })
    );
    tasksId.current = [];

    return true;
  };

  const handleContextMenuCompleteClick = () => {
    if (!taskData.current) {
      return false;
    }

    dispatch(
      tasksActions.fetchUpdateStatus({
        tasksId: [taskData.current.id],
        status: 3,
      })
    );
    tasksId.current = [];

    return true;
  };

  const handleContextMenuRemoveClick = () => {
    if (!taskData.current) {
      return false;
    }

    dispatch(tasksActions.fetchRemoveTask([taskData.current.id]));
    tasksId.current = [];

    return true;
  };

  const handleContextMenuEditClick = () => {
    const editor = editorRef.current;

    if (!taskData.current || !editor) {
      return false;
    }

    editor.setEditorType('editData');
    editor.setTextData(taskData.current.text);
    editor.setIsActive(true);

    return true;
  };

  const handleUpdateTask = (text: string) => {
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
  };

  const totalCurrent = tasks.current?.length ?? 0;
  const totalInProgress = tasks.inProgress?.length ?? 0;
  const totalCompleted = tasks.completed?.length ?? 0;

  return (
    <Manager title="Менеджер задач">
      <Menu
        buttons={[
          {
            name: 'Добавить',
            handler: handleButtonAddClick,
          },
          {
            name: 'Удалить',
            handler: handleButtonRemoveClick,
          },
          {
            name: 'Выбрать всё',
            handler: handleButtonAllClick,
          },
          {
            name: 'В задачи',
            handler: handleButtonToTasksClick,
          },
          {
            name: 'Выполнить',
            handler: handleButtonRunClick,
          },
          {
            name: 'Завершить',
            handler: handleButtonCompleteClick,
          },
          {
            name: 'Проекты',
            handler: handleButtonTaskClick,
          },
          {
            name: 'Выйти',
            handler: handleButtonExitClick,
          },
        ]}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Tabs
          tabs={[
            {
              name: 'Задачи',
              content: (
                <TodoList
                  list={tasks.current ?? []}
                  onCheckboxClick={handleCheckboxClick}
                  onClick={handleTodoListClick}
                  onContextMenu={handleTodoItemContextMenu}
                  isChecked={isChecked}
                  type="task"
                  status={1}
                />
              ),
              index: 1,
            },
            {
              name: 'Выполняются',
              content: (
                <TodoList
                  list={tasks.inProgress ?? []}
                  onCheckboxClick={handleCheckboxClick}
                  onClick={handleTodoListClick}
                  onContextMenu={handleTodoItemContextMenu}
                  isChecked={isChecked}
                  type="task"
                  status={2}
                />
              ),
              index: 2,
            },
            {
              name: 'Завершённые',
              content: (
                <TodoList
                  list={tasks.completed ?? []}
                  onCheckboxClick={handleCheckboxClick}
                  onClick={handleTodoListClick}
                  onContextMenu={handleTodoItemContextMenu}
                  isChecked={isChecked}
                  type="task"
                  status={3}
                />
              ),
              index: 3,
            },
          ]}
        />
      )}
      <Footer
        type={'tasks'}
        total={totalCurrent + totalInProgress + totalCompleted}
        totalTasks={totalCurrent}
        totalPerformed={totalInProgress}
        totalCompleted={totalCompleted}
      />
      <Editor onAddData={handleAddDataTask} onUpdate={handleUpdateTask} ref={editorRef} />
      <ContextMenu
        buttons={[
          {
            name: 'Просмотр',
            handler: handleContextMenuView,
          },
          {
            name: 'Редактировать',
            handler: handleContextMenuEditClick,
          },
          {
            name: 'Удалить',
            handler: handleContextMenuRemoveClick,
          },
          {
            name: 'В задачи',
            handler: handleContextMenuToTasksClick,
          },
          {
            name: 'Выполнить',
            handler: handleContextMenuRunClick,
          },
          {
            name: 'Завершить',
            handler: handleContextMenuCompleteClick,
          },
        ]}
        ref={contextMenuRef}
      />
    </Manager>
  );
};

export default Tasks;
