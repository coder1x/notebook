import { RouteObject } from 'react-router-dom';

import { SignIn, SignUp } from '@components/index';
import Projects from '@pages/projects/Projects';
import Tasks from '@pages/tasks/Tasks';

import { createProtectedRoutes } from '@shared/helpers/';
import routes from './routes';

const appRoutes: RouteObject[] = [
  { path: routes.signIn, element: <SignIn /> },
  { path: routes.signUp, element: <SignUp /> },
  {
    path: routes.projects,
    element: <Projects />,
    children: createProtectedRoutes([{ path: routes.tasks, element: <Tasks /> }]),
  },
  { path: routes.wrong, element: <>Wrong Path</> },
];

export default appRoutes;
