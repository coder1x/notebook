import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// это то же можно убрать из функции
function getProject(id: number, state: any) {
  if (Array.isArray(state.projects)) {
    return state.projects.find((item: any) => item.id === id);
  }

  return 0;
}

// это можно убрать из функци
// function removeProject(id: number, projects: {}[]) {
//   return projects.filter((item: any) => item.id !== id);
// }

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
    addProject(state, action: PayloadAction<any>) {
      const { id, text } = action.payload;

      state.projects?.push({
        id,
        text,
      });
    },
    // eslint-disable-next-line no-unused-vars
    removeProject(state, action: PayloadAction<any>) {
      // const { projectsId } = action.payload;
      // projectsId.forEach((id: number) => {
      //   state.projects = removeProject(id, state.projects);
      // });
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
    fetchRemoveProject(state, action: PayloadAction<any>) {
      //
    },
    // eslint-disable-next-line no-unused-vars
    fetchAddProject(state, action: PayloadAction<any>) {
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
