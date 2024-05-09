import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Project, EditProject, ChangePosition } from './projectsType';

const initialState: State = {
  projects: null,
  isLoading: true,
  errorCode: 0,
};

const projects = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
      state.isLoading = false;
    },

    changePositionProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
      state.isLoading = false;
    },

    clearState(state) {
      state.projects = null;
      state.errorCode = 0;
    },

    addProject(state, action: PayloadAction<Project>) {
      const { id, text, position } = action.payload;

      if (Array.isArray(state.projects)) {
        state.projects.push({
          id,
          text,
          position,
        });
      } else {
        state.projects = [
          {
            id,
            text,
            position,
          },
        ];
      }
    },

    removeProject(state, action: PayloadAction<number[]>) {
      const projectsId = action.payload;
      let projectsTemp = state.projects;

      projectsId.forEach((id) => {
        projectsTemp = projectsTemp?.filter((item) => item.id !== id) ?? null;
      });

      state.projects = projectsTemp;
    },

    editProject(state, action: PayloadAction<Project>) {
      const { id, text } = action.payload;
      const projectsTemp = state.projects;

      if (text.trim()) {
        if (Array.isArray(projectsTemp)) {
          const index = projectsTemp.findIndex((item) => item.id === id);

          projectsTemp[index].text = text;
        }
      }

      state.projects = projectsTemp;
    },
    fetchEditProject(state, action: PayloadAction<EditProject>) {
      //
    },
    fetchRemoveProject(state, action: PayloadAction<number[]>) {
      //
    },
    fetchAddProject(state, action: PayloadAction<string>) {
      //
    },
    fetchProjectsData(state) {
      state.isLoading = true;
    },
    fetchProjectsPosition(state, action: PayloadAction<ChangePosition>) {
      state.isLoading = true;
    },
    errorProject(state, action: PayloadAction<number>) {
      state.errorCode = action.payload;
    },
  },
});

const projectsReducer = projects.reducer;
const projectsActions = projects.actions;

export { projectsActions, projectsReducer };
