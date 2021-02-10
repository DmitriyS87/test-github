import React, { FC, lazy, Suspense } from 'react';

import { ModuleLoader } from '../../ui';

const IssueModule = lazy(
  () => import(/* webpackChunkName: "Issue" */ './module'),
);

export const Issue: FC = () => (
  <Suspense fallback={<ModuleLoader />}>
    <IssueModule />
  </Suspense>
);
