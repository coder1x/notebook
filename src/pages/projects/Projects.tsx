import { useEffect, useRef, MutableRefObject, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TodoItem, Footer, Menu, Editor } from '@components/index';
import { tokenState, projectsState } from '@store/selectors';
import { projectsActions, signInActions } from '@store/slices';

const Projects: FC = () => {
  let projectsId: number[] = [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(tokenState);
  const projects = useSelector(projectsState);

  const editorRef: MutableRefObject<null | { setIsActive: (data: boolean) => void }> = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else if (!projects) {
      dispatch(projectsActions.fetchProjectsData());
    }
  }, [dispatch, navigate, projects, token]);

  const handleButtonAddClick = () => {
    const editor = editorRef.current;

    if (editor) {
      editor.setIsActive(true);
    }
  };

  const handleButtonRemoveClick = () => {
    dispatch(projectsActions.fetchRemoveProject(projectsId));
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
    dispatch(projectsActions.fetchAddProject(text));
  };

  let total = 0;
  const itemsTodo: JSX.Element[] = [];

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
      <Editor
        type="addData"
        headerText="Добавить проект"
        onAddData={handleAddDataProject}
        ref={editorRef}
      />
    </article>
  );
};

export default Projects;
