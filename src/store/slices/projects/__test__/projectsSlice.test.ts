import store from '@store/store';
import { projectsActions } from '@store/slices';

describe('Projects slice', () => {
  it('should return the initial state', () => {
    expect(store.getState().projects).toEqual({
      projects: null,
      isLoading: true,
      errorCode: 0,
    });
  });

  it('action setProjects', () => {
    const projectsData = [
      {
        id: 1,
        text: 'проект 1',
      },
      {
        id: 2,
        text: 'проект 2',
      },
    ];

    store.dispatch(projectsActions.setProjects(projectsData));

    expect(store.getState().projects).toEqual({
      projects: projectsData,
      isLoading: false,
      errorCode: 0,
    });
  });

  it('action clearState', () => {
    store.dispatch(projectsActions.clearState());

    expect(store.getState().projects).toEqual({
      projects: null,
      isLoading: false,
      errorCode: 0,
    });
  });

  it('action addProject', () => {
    const projectData = {
      id: 1,
      text: 'проект 1',
    };

    store.dispatch(projectsActions.addProject(projectData));

    expect(store.getState().projects.projects).toEqual([projectData]);
  });

  it('action removeProject', () => {
    for (let i = 2; i <= 4; i += 1) {
      store.dispatch(
        projectsActions.addProject({
          id: i,
          text: `проект ${i}`,
        })
      );
    }

    store.dispatch(projectsActions.removeProject([1, 3]));

    expect(store.getState().projects.projects).toEqual([
      { id: 2, text: 'проект 2' },
      { id: 4, text: 'проект 4' },
    ]);
  });

  it('action editProject', () => {
    store.dispatch(projectsActions.editProject({ id: 4, text: 'проект 4 ****' }));

    expect(store.getState().projects.projects).toEqual([
      { id: 2, text: 'проект 2' },
      { id: 4, text: 'проект 4 ****' },
    ]);
  });

  it('action fetchProjectsData', () => {
    store.dispatch(projectsActions.fetchProjectsData());

    expect(store.getState().projects.isLoading).toEqual(true);
  });

  it('action errorProject', () => {
    store.dispatch(projectsActions.errorProject(123));

    expect(store.getState().projects.errorCode).toEqual(123);
  });
});
