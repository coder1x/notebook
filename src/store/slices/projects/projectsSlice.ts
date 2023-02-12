import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// это то же можно убрать из функции
function getProject(id: number, state: any) {
  if (Array.isArray(state.projects)) {
    return state.projects.find((item: any) => item.id === id);
  }

  return 0;
}

type objectD = {
  id: number;
  text: string;
};

type State = {
  projects: objectD[] | null;
};

const initialState: State = {
  projects: null,
};

const projects = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<any>) {
      state.projects = action.payload;
    },

    addProject(state, action: PayloadAction<objectD>) {
      const { id, text } = action.payload;

      state.projects?.push({
        id,
        text,
      });
    },

    removeProject(state, action: PayloadAction<number[]>) {
      const projectsId = action.payload;
      let projectsTemp = state.projects;

      projectsId.forEach((id) => {
        projectsTemp = projectsTemp?.filter((item) => item.id !== id) ?? null;
      });

      state.projects = projectsTemp;
    },

    editProject(state, action: PayloadAction<any>) {
      const { id, text } = action.payload;
      if (text) {
        const project = getProject(id, state);
        project.text = text;
        // state.projects.push(project);
      }
    },
    // eslint-disable-next-line no-unused-vars
    fetchEditProject(state, action: PayloadAction<any>) {
      //
    },
    // eslint-disable-next-line no-unused-vars
    fetchRemoveProject(state, action: PayloadAction<number[]>) {
      //
    },
    // eslint-disable-next-line no-unused-vars
    fetchAddProject(state, action: PayloadAction<string>) {
      //
    },
    // eslint-disable-next-line no-unused-vars
    fetchProjectsData(state) {
      //
    },
  },
});

const projectsReducer = projects.reducer;
const projectsActions = projects.actions;

export { projectsActions, projectsReducer };
