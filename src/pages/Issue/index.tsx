import { ModuleLoader } from '@ui';
import React, { FC, lazy, Suspense } from 'react';

const IssueModule = lazy(
  () => import(/* webpackChunkName: "Issue" */ './module'),
);

export const Issue: FC = () => (
  <Suspense fallback={<ModuleLoader />}>
    <IssueModule />
  </Suspense>
);
