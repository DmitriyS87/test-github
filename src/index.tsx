import { createBrowserHistory } from 'history';
import React, { FC, Suspense } from 'react';
import { render } from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';

import { App } from './modules/app';
import { ContextProviderApp } from './modules/app/context/app';
import { ModuleLoader } from './ui';

const entry = document.querySelector('.app');
const history = createBrowserHistory();

const Root: FC = () => (
  <ContextProviderApp>
    <Router history={history}>
      <Suspense fallback={<ModuleLoader />}>
        <App />
      </Suspense>
    </Router>
  </ContextProviderApp>
);

render(<Root />, entry);
