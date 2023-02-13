type Project = {
  id: number;
  text: string;
};

type State = {
  projects: Project[] | null;
  isLoading: boolean;
};

export { State, Project };
