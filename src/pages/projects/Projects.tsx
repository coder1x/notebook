import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TodoItem, Footer, Menu, Editor } from '@components/index';
import { tokenState, projectsState } from '@store/selectors';
import { projectsActions, signInActions } from '@store/slices';

function Projects() {
  let projectsId: number[] = [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(tokenState);
  const projects = useSelector(projectsState);

  console.log('projects ', projects);

  // const checkData = (data: any) => {
  //   if (!Array.isArray(data)) return true;
  //   return Object.keys(data[0]).length !== 0;
  // };

  // let { projects, token } = props;

  // let isServerData = false;

  // if (!checkData(projects)) {
  //   projects = propsData.data;

  //   if (!token) {
  //     token = propsData.token;
  //   }

  //   isServerData = true;
  // }

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else if (!projects) {
      dispatch(projectsActions.fetchProjectsData());
    }
  }, [dispatch, navigate, projects, token]);

  useEffect(() => {
    // if (isServerData) {
    //   dispatch({
    //     type: 'SET_MANAGER_TOKEN',
    //     token,
    //   });
    //   dispatch({
    //     type: 'GET_PROJECT_DATA',
    //     projects,
    //   });
    // }
  });

  const handleButtonAddClick = () => {
    // dispatch({
    //   type: 'ADD_RECORD',
    //   header: 'Добавить проект',
    //   text: '',
    // });
  };

  const handleButtonRemoveClick = () => {
    // dispatch({
    //   type: 'FETCH_REMOVE_PROJECT_STORE',
    //   token: token,
    //   projectsId,
    // });
  };

  const handleButtonExitClick = () => {
    dispatch(signInActions.removeSignInToken());
  };

  const handleProjectClick = (projectId: number) => {
    // dispatch({
    //   type: 'SET_MANAGER_PROJECT_ID',
    //   projectId,
    // });
    // Router.push(`tasks/${projectId}`);
  };

  const handleCheckboxClick = (inputElement: HTMLInputElement) => {
    if (inputElement.checked) {
      projectsId.push(parseInt(inputElement.name, 10));
    } else {
      projectsId = projectsId.filter((id) => id !== parseInt(inputElement.name, 10));
    }
  };

  const handleAddDataProject = (text: string) => {
    // dispatch({
    //   type: 'FETCH_ADD_PROJECT',
    //   token,
    //   text,
    // });
  };

  let componentEditor: any;
  let total = 0;
  const itemsTodo: any = [];

  // switch (props.componentEditor) {
  //   case 'addRecord':
  //     componentEditor = <Editor addData={handleAddDataProject} />;
  //     break;

  //   case 'editRecord':
  //     componentEditor = <Editor />;
  //     break;

  //   default:
  //     componentEditor = '';
  //     break;
  // }

  if (Array.isArray(projects)) {
    const { length } = projects;
    // eslint-disable-next-line prettier/prettier
    for (let i: number = length; i > 0;) {
      const projectData = projects[(i -= 1)];
      if (Object.keys(projectData).length !== 0) {
        total += 1;
        const projectId = projectData.id;
        itemsTodo.push(
          <TodoItem
            key={projectId}
            index={total}
            id={projectId}
            text={projectData.text}
            clickProject={handleProjectClick}
            clickCheckbox={handleCheckboxClick}
          />
        );
      }
    }
  }

  return (
    <article className="manager-projects">
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
            name: 'Выйти',
            handler: handleButtonExitClick,
          },
        ]}
      />
      <ul className="manager-projects__list">{itemsTodo}</ul>

      <Footer total={total} />
      {componentEditor}
    </article>
  );
}

export default Projects;
