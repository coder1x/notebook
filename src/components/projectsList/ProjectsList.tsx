import { FC } from 'react';
import { TodoItem } from '@components/index';
import { projectsType } from '@store/slices';

type Props = {
  projects: projectsType.Project[];
  onCheckboxClick: (object: HTMLInputElement) => void;
};

const ProjectsList: FC<Props> = ({ projects, onCheckboxClick }) => {
  let { length = 0 } = projects;

  return (
    <ul className="projects-list">
      {projects.map((item, index, array) => {
        const project = array[(length -= 1)];

        if (Object.keys(project).length !== 0) {
          const { id } = project;

          return <TodoItem key={id} id={id} text={project.text} clickCheckbox={onCheckboxClick} />;
        }
        return <></>;
      })}
    </ul>
  );
};

export default ProjectsList;
