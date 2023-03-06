type Project = {
  id: number;
  text: string;
};

type State = {
  projects: Project[] | null;
  isLoading: boolean;
  errorCode: number;
};

export { State, Project };
