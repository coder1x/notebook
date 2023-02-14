import { useEffect, useRef, MutableRefObject, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Footer, Menu, Editor, Loading, ProjectsList } from '@components/index';
import { tokenState, projectsState, isLoadingState } from '@store/selectors';
import { projectsActions, signInActions } from '@store/slices';

const Projects: FC = () => {
  let projectsId: number[] = [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(tokenState);
  const projects = useSelector(projectsState);
  const isLoading = useSelector(isLoadingState);

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
    dispatch(projectsActions.clearState());
    dispatch(signInActions.removeSignInToken());
  };

  const handleProjectClick = (projectId: number) => {
    navigate(`/tasks/${projectId}`);
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
      {isLoading ? (
        <Loading />
      ) : (
        Array.isArray(projects) && (
          <ProjectsList
            projects={projects}
            onProjectClick={handleProjectClick}
            onCheckboxClick={handleCheckboxClick}
          />
        )
      )}
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
