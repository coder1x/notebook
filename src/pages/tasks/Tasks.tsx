import { useEffect, useRef, MutableRefObject, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Footer,
  Menu,
  Editor,
  Loading,
  TodoList,
  Placeholder,
  Tabs,
  Manager,
} from '@components/index';
import {
  tokenState,
  tasksState,
  isLoadingTasksState,
  isAuthorizedState,
  errorCodeTasksState,
} from '@store/selectors';
import { tasksActions, signInActions } from '@store/slices';

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
  const editorRef: MutableRefObject<null | { setIsActive: (data: boolean) => void }> = useRef(null);

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
      <Editor
        type="addData"
        headerText="Добавить задачу"
        onAddData={handleAddDataTask}
        ref={editorRef}
      />
    </Manager>
  );
};

export default Tasks;
