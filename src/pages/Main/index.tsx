import { ModuleLoader } from '@ui';
import React, { FC, lazy, Suspense } from 'react';

const MainModule = lazy(
  () => import(/* webpackChunkName: "Main" */ './module'),
);

export const Main: FC = () => (
  <Suspense fallback={<ModuleLoader />}>
    <MainModule />
  </Suspense>
);
