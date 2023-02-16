import { useParams } from 'react-router-dom';

function Tasks() {
  const { projectId } = useParams();

  return <>Проект: {projectId}</>;
}

export default Tasks;
