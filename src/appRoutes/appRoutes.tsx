import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { SignIn, SignUp } from '@components/index';

import { createProtectedRoutes } from '@shared/helpers/';
import routes from './routes';

const WrongPage = lazy(() => import('@pages/wrongPage/WrongPage'));
const Projects = lazy(() => import('@pages/projects/Projects'));
const Tasks = lazy(() => import('@pages/tasks/Tasks'));

const appRoutes: RouteObject[] = [
  {
    path: routes.signIn,
    element: <SignIn />,
  },
  {
    path: routes.signUp,
    element: <SignUp />,
  },
  {
    path: routes.projects,
    element: <Projects />,

    children: createProtectedRoutes([
      {
        path: routes.tasks,
        element: <Tasks />,
      },
    ]),
  },
  {
    path: routes.wrong,
    element: <WrongPage />,
  },
];

export default appRoutes;
