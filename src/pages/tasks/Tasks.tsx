import { useEffect, useRef, MutableRefObject, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Footer,
  Menu,
  Editor,
  Loading,
  ProjectsList,
  Placeholder,
  Tabs,
  Manager,
} from '@components/index';
import { tokenState, tasksState, isLoadingTasksState } from '@store/selectors';
import { tasksActions } from '@store/slices';

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
    //
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
    //
  };

  const handleButtonExitClick = () => {
    //
  };

  const handleAddDataTask = () => {
    //
  };

  const handleCheckboxClick = () => {
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
                <ProjectsList
                  projects={tasks.current ?? []}
                  onCheckboxClick={handleCheckboxClick}
                />
              ),
              index: 1,
            },
            {
              name: 'Выполняются',
              content: (
                <ProjectsList
                  projects={tasks.inProgress ?? []}
                  onCheckboxClick={handleCheckboxClick}
                />
              ),
              index: 2,
            },
            {
              name: 'Завершённые',
              content: (
                <ProjectsList
                  projects={tasks.completed ?? []}
                  onCheckboxClick={handleCheckboxClick}
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
        headerText="Добавить проект"
        onAddData={handleAddDataTask}
        ref={editorRef}
      />
    </Manager>
  );
}

export default Tasks;

// function ManagerTasks(propsData: any) {
//   let taskId: number[] = [];

//   const dispatch = useDispatch();
//   const status = useRef({ isStarted: false });

//   const props = useSelector((state: any) => ({
//     token: state.manager.token,
//     projectId: state.manager.projectId,
//     componentEditor: state.editor.componentEditor,
//     tasks: state.tasks.tasks,
//   }));

//   const checkData = (data: any) => {
//     if (!Array.isArray(data)) return true;
//     return Object.keys(data[0]).length !== 0;
//   };

//   let { tasks, token, projectId } = props;
//   let isServerData = false;

//   const isNewProjectId = propsData.projectId !== projectId;
//   const isEmptyData = !checkData(tasks) && !status.current.isStarted;

//   if (isEmptyData || isNewProjectId) {

//     tasks = propsData.data
//     token = propsData.token;
//     projectId = propsData.projectId;

//     status.current.isStarted = true;
//     isServerData = true;
//   }

//   useEffect(() => {
//     if (!token) {
//       Router.push('/');
//     }

//     if (isServerData) {
//       dispatch({
//         type: 'SET_MANAGER_TOKEN',
//         token,
//       });

//       dispatch({
//         type: 'SET_MANAGER_PROJECT_ID',
//         projectId,
//       });

//       dispatch({
//         type: 'SET_TASKS_DATA',
//         tasks,
//       });
//     }
//   }, [dispatch, isServerData, projectId, tasks, token]);

//   const handleButtonAddClick = () => {
//     dispatch({
//       type: 'ADD_RECORD',
//       header: 'Добавить задачу',
//     });
//   };

//   const handleButtonRemoveClick = () => {
//     dispatch({
//       type: 'FETCH_REMOVE_TASK_STORE',
//       token: token,
//       taskId,
//     });
//   };

//   const handleButtonExitClick = () => {
//     dispatch({
//       type: 'SET_MANAGER_TOKEN',
//       token: '',
//     });

//     Router.push('/');
//   };

//   const handleButtonTaskClick = () => {
//     Router.push('/projects');
//   }

//   const handleButtonToTasksClick = () => {
//     dispatch({
//       type: 'FETCH_UPDATE_TASK_STORE',
//       token: token,
//       taskId,
//       status: 1,
//     });
//   }

//   const handleButtonRunClick = () => {
//     dispatch({
//       type: 'FETCH_UPDATE_TASK_STORE',
//       token: token,
//       taskId,
//       status: 2,
//     });
//   }

//   const handleButtonCompleteClick = () => {
//     dispatch({
//       type: 'FETCH_UPDATE_TASK_STORE',
//       token: token,
//       taskId,
//       status: 3,
//     });
//   }

//   const handleCheckboxClick = (inputElement: HTMLInputElement) => {
//     if (inputElement.checked) {
//       taskId.push(parseInt(inputElement.name, 10));
//     } else {
//       taskId = taskId.filter((id) => id !== parseInt(inputElement.name, 10),);
//     }
//   };

//   const handleAddDataTask = (text: string) => {
//     dispatch({
//       type: 'FETCH_ADD_TASK',
//       token,
//       text,
//       projectId,
//     });
//   }

//   let componentEditor: any;

//   const itemsTasks: any = [];
//   const itemsPerformed: any = [];
//   const itemsCompleted: any = [];
//   const total = [0, 0, 0];

//   // заменить на объект свойства которого будут addRecord, editRecord
//   switch (props.componentEditor) {
//     case 'addRecord':
//       componentEditor = <Editor
//         addData={handleAddDataTask}
//       />;
//       break;

//     case 'editRecord':
//       componentEditor = <Editor />;
//       break;

//     default:
//       componentEditor = '';
//       break;
//   }

//   if (tasks) {
//     const { length } = tasks;

//     for (let i: number = length; i > 0;) {
//       const taskData = tasks[i -= 1];

//       if (Object.keys(taskData).length !== 0) {

//         const { id, text, status } = taskData;
//         const index = status - 1;
//         total[index] += 1;

//         const item = <TodoItem
//           key={id}
//           index={total[index]}
//           id={id}
//           text={text}
//           clickProject={() => { alert('Кликнули по задаче'); }}
//           clickCheckbox={handleCheckboxClick}
//         />

//         switch (status) {
//           case 1:
//             itemsTasks.push(item);
//             break;
//           case 2:
//             itemsPerformed.push(item);
//             break;
//           case 3:
//             itemsCompleted.push(item);
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   }

//   const totalTasks = itemsTasks.length;
//   const totalPerformed = itemsPerformed.length;
//   const totalCompleted = itemsCompleted.length;
//   const totalItem = totalTasks + totalPerformed + totalCompleted;

//   function createList(items: any, index: number) {
//     return <ul className={Style.list}>{items}</ul>;
//   }

//   return (
//     <article className={Style.managerTasks}>
//       <Menu
//         buttons={
//           [
//             {
//               name: 'Добавить',
//               handler: handleButtonAddClick,
//             },
//             {
//               name: 'Удалить',
//               handler: handleButtonRemoveClick,
//             },
//             {
//               name: 'В задачи',
//               handler: handleButtonToTasksClick,
//             },
//             {
//               name: 'Выполнить',
//               handler: handleButtonRunClick,
//             },
//             {
//               name: 'Завершить',
//               handler: handleButtonCompleteClick,
//             },
//             {
//               name: 'Проекты',
//               handler: handleButtonTaskClick,
//             },
//             {
//               name: 'Выйти',
//               handler: handleButtonExitClick,
//             }
//           ]
//         }
//       />
//       <Tabs
//         tabs={
//           [
//             {
//               name: 'Задачи',
//               content: createList(itemsTasks, 1),
//               index: 1,
//             },
//             {
//               name: 'Выполняются',
//               content: createList(itemsPerformed, 2),
//               index: 2,
//             },
//             {
//               name: 'Завершённые',
//               content: createList(itemsCompleted, 3),
//               index: 3,
//             }
//           ]
//         }
//       />

//       <Footer
//         type={'tasks'}
//         total={totalItem}
//         totalTasks={totalTasks}
//         totalPerformed={totalPerformed}
//         totalCompleted={totalCompleted}
//       />
//       {componentEditor}
//     </article>
//   );
// }

// export default ManagerTasks;
