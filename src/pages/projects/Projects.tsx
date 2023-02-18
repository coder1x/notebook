import { useEffect, useRef, MutableRefObject, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Footer, Menu, Editor, Loading, ProjectsList, Placeholder } from '@components/index';
import { tokenState, projectsState, isLoadingState } from '@store/selectors';
import { projectsActions, signInActions } from '@store/slices';

const Projects: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(tokenState);
  const projects = useSelector(projectsState);
  const isLoading = useSelector(isLoadingState);

  document.title = 'Менеджер проектов';

  const projectsId: MutableRefObject<number[]> = useRef([]);
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
    dispatch(projectsActions.fetchRemoveProject(projectsId.current));
    projectsId.current = [];
  };

  const handleButtonExitClick = () => {
    dispatch(projectsActions.clearState());
    dispatch(signInActions.removeSignInToken());
  };

  const handleCheckboxClick = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement.checked) {
      projectsId.current.push(parseInt(inputElement.name, 10));
    } else {
      projectsId.current = projectsId.current.filter(
        (id) => id !== parseInt(inputElement.name, 10)
      );
    }
  }, []);

  const handleAddDataProject = (text: string) => {
    dispatch(projectsActions.fetchAddProject(text));
  };

  const main =
    Array.isArray(projects) && projects.length ? (
      <ProjectsList projects={projects} onCheckboxClick={handleCheckboxClick} />
    ) : (
      <Placeholder text="Добавьте проект" />
    );

  return (
    <article className="manager-projects">
      <h1 className="manager-projects__title">Менеджер проектов</h1>
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
      {isLoading ? <Loading /> : main}
      <Footer total={projects?.length ?? 0} />
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
