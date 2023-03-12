import { useEffect, useRef, useState, MutableRefObject, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Footer, Menu, Editor, Loading, TodoList, Manager, ContextMenu } from '@components/index';
import {
  tokenState,
  projectsState,
  isLoadingState,
  errorCodeProjectsState,
  isAuthorizedState,
} from '@store/selectors';
import { projectsActions, signInActions } from '@store/slices';
import { ContextMenuActions, EditorActions } from './projectsType';

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
  const contextMenuRef: MutableRefObject<null | ContextMenuActions> = useRef(null);
  const projectData: MutableRefObject<{ id: number; text: string } | null> = useRef(null);

  const editorRef: MutableRefObject<null | EditorActions> = useRef(null);

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
      editor.setConfig({
        ...editor.config,
        title: 'Добавить проект',
        isActive: true,
      });
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

  const handleTodoItemContextMenu = (item: { id: number; text: string }) => {
    const contextMenu = contextMenuRef.current;

    if (contextMenu) {
      contextMenu.setIsActive(true);
    }

    projectData.current = item;
  };

  const handleContextMenuView = () => {
    if (!projectData.current) {
      return false;
    }

    const editor = editorRef.current;

    if (editor) {
      editor.setConfig({
        title: 'Просмотр проекта',
        type: 'viewData',
        text: projectData.current.text,
        isActive: true,
      });
    }

    return true;
  };

  const handleContextMenuEditClick = () => {
    const editor = editorRef.current;

    if (!projectData.current || !editor) {
      return false;
    }

    editor.setConfig({
      title: 'Редактирование проекта',
      type: 'editData',
      text: projectData.current.text,
      isActive: true,
    });

    return true;
  };

  const handleContextMenuRemoveClick = () => {
    if (!projectData.current) {
      return false;
    }

    dispatch(projectsActions.fetchRemoveProject([projectData.current.id]));
    projectsId.current = [];

    return true;
  };

  const handleUpdateTask = (text: string) => {
    if (!projectData.current) {
      return false;
    }

    dispatch(
      projectsActions.fetchEditProject({
        id: projectData.current.id,
        text,
      })
    );

    return true;
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
            onContextMenu={handleTodoItemContextMenu}
            isChecked={isChecked}
            type="project"
          />
        )
      )}
      <Footer total={projects?.length ?? 0} />
      <Editor onAddData={handleAddDataProject} onUpdate={handleUpdateTask} ref={editorRef} />
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
        ]}
        ref={contextMenuRef}
      />
    </Manager>
  );
};

export default Projects;
