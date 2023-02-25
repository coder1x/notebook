import { useEffect, useRef, MutableRefObject, FC, useCallback } from 'react';
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
import { tokenState, tasksState, isLoadingTasksState } from '@store/selectors';
import { tasksActions, signInActions } from '@store/slices';

function Tasks() {
  const { projectId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(tokenState);
  const tasks = useSelector(tasksState);
  const isLoading = useSelector(isLoadingTasksState);

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

  const handleButtonAddClick = () => {
    const editor = editorRef.current;

    if (editor) {
      editor.setIsActive(true);
    }
  };

  const handleButtonRemoveClick = () => {
    //
  };

  const handleButtonToTasksClick = () => {
    //
  };

  const handleButtonRunClick = () => {
    //
  };

  const handleButtonCompleteClick = () => {
    //
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
        text,
        projectId: projectId ?? '',
      })
    );
  };

  const handleCheckboxClick = () => {
    //
  };

  const handleButtonAllClick = () => {
    //
  };

  // const main =
  //   Array.isArray(tasks) && tasks.length ? (
  //     <ProjectsList projects={tasks} onCheckboxClick={handleCheckboxClick} />
  //   ) : (
  //     <Placeholder text="Добавьте проект" />
  //   );

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
                <TodoList list={tasks.current ?? []} onCheckboxClick={handleCheckboxClick} />
              ),
              index: 1,
            },
            {
              name: 'Выполняются',
              content: (
                <TodoList list={tasks.inProgress ?? []} onCheckboxClick={handleCheckboxClick} />
              ),
              index: 2,
            },
            {
              name: 'Завершённые',
              content: (
                <TodoList list={tasks.completed ?? []} onCheckboxClick={handleCheckboxClick} />
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
}

export default Tasks;
