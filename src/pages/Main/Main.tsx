import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';

import Layout from '@pages/layout/Layout';
import appRoutes from '@appRoutes/appRoutes';
import { Loading } from '@components/index';

function Main() {
  const routes = useRoutes(appRoutes);

  return (
    <Suspense fallback={<Loading />}>
      <Layout>{routes}</Layout>
    </Suspense>
  );
}

export default Main;
