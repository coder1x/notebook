type Project = {
  id: number;
  text: string;
  position: number;
};

type EditProject = {
  id: number;
  text: string;
};

type State = {
  projects: Project[] | null;
  isLoading: boolean;
  errorCode: number;
};

type ChangePosition = {
  from: {
    id: number;
    position: number;
  };
  to: {
    id: number;
    position: number;
  };
};

export { State, Project, EditProject, ChangePosition };
