import React, { FC, lazy, Suspense } from 'react';

import { ModuleLoader } from '../../ui';

const MainModule = lazy(
  () => import(/* webpackChunkName: "Main" */ './module'),
);

export const Main: FC = () => (
  <Suspense fallback={<ModuleLoader />}>
    <MainModule />
  </Suspense>
);
