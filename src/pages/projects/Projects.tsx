import { useEffect, useRef, useState, MutableRefObject, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Footer, Menu, Editor, Loading, TodoList, Manager } from '@components/index';
import {
  tokenState,
  projectsState,
  isLoadingState,
  errorCodeProjectsState,
  isAuthorizedState,
} from '@store/selectors';
import { projectsActions, signInActions } from '@store/slices';

const Projects: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthorized = useSelector(isAuthorizedState);
  const errorCode = useSelector(errorCodeProjectsState);
  const token = useSelector(tokenState);
  const projects = useSelector(projectsState);
  const isLoading = useSelector(isLoadingState);

  const [isChecked, setIsChecked] = useState(false);

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

  useEffect(() => {
    if (isAuthorized) {
      return;
    }

    if (token) {
      dispatch(signInActions.setAuthorized(true));
    } else {
      dispatch(projectsActions.clearState());
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
    dispatch(projectsActions.fetchRemoveProject(projectsId.current));
    projectsId.current = [];
  };

  const handleButtonExitClick = () => {
    dispatch(projectsActions.clearState());
    dispatch(signInActions.removeSignInToken());
  };

  const handleCheckboxClick = useCallback((id: number, checked: boolean) => {
    if (checked) {
      projectsId.current.push(id);
    } else {
      projectsId.current = projectsId.current.filter((itemId) => itemId !== id);
    }
  }, []);

  const handleAddDataProject = (text: string) => {
    dispatch(projectsActions.fetchAddProject(text.trim()));
  };

  const handleButtonAllClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Manager title="Менеджер проектов">
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
            name: 'Выйти',
            handler: handleButtonExitClick,
          },
        ]}
      />
      {isLoading ? (
        <Loading />
      ) : (
        Array.isArray(projects) && (
          <TodoList
            list={projects}
            onCheckboxClick={handleCheckboxClick}
            isChecked={isChecked}
            type="project"
          />
        )
      )}
      <Footer total={projects?.length ?? 0} />
      <Editor onAddData={handleAddDataProject} ref={editorRef} />
    </Manager>
  );
};

export default Projects;
