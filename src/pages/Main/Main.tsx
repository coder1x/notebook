import { useRoutes } from 'react-router-dom';

import Layout from '@pages/layout/Layout';
import appRoutes from '@appRoutes/appRoutes';

function Main() {
  const routes = useRoutes(appRoutes);

  return <Layout>{routes}</Layout>;
}

export default Main;
