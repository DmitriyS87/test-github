import { ModuleLoader } from '@ui';
import React, { FC, Suspense } from 'react';
import { lazy } from 'react';

export const AppComponent = lazy(
  () => import(/* webpackChunkName: "App" */ './module'),
);

export const App: FC = () => (
  <Suspense fallback={<ModuleLoader />}>
    <AppComponent />
  </Suspense>
);

export * from './components';
export * from './context';
