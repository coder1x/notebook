import { projectsType } from '@store/slices';

type FetchData = {
  error: boolean;
  messageError: string;
  code: number;
};

interface Projects extends FetchData {
  value?: projectsType.Project[];
}

interface AddProject extends FetchData {
  value: {
    id: number;
    position: number;
  };
}

interface RemoveProject extends FetchData {
  value?: number;
}

interface UpdateProjectText extends FetchData {
  value?: number;
}

type Data = Projects | AddProject | RemoveProject | UpdateProjectText;

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

export { FetchData, Projects, AddProject, RemoveProject, UpdateProjectText, Data, ChangePosition };
