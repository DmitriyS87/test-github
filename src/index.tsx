import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import { App } from './modules/app';
import { ContextProviderApp } from './modules/app/context/app';

const entry = document.querySelector('.app');
const history = createBrowserHistory();

const Root: FC = () => (
  <SnackbarProvider>
    <ContextProviderApp>
      <Router history={history}>
        <App />
      </Router>
    </ContextProviderApp>
  </SnackbarProvider>
);

render(<Root />, entry);
