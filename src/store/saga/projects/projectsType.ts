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
  value?: number;
}

interface RemoveProject extends FetchData {
  value?: number;
}

interface UpdateProjectText extends FetchData {
  value?: number;
}

type Data = Projects | AddProject | RemoveProject | UpdateProjectText;

export { FetchData, Projects, AddProject, RemoveProject, UpdateProjectText, Data };
