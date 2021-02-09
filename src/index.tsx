import React, { FC, Suspense } from "react";
import { createBrowserHistory } from "history";
import { render } from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { App } from "./modules/app";
import { ContextProviderApp } from "./modules/app/context/app";

const entry = document.querySelector(".app");
const history = createBrowserHistory();

const ModuleLoader: FC = () => {
  return <div>Loading</div>;
};

const Root: FC = () => (
  <ContextProviderApp>
    <Router history={history}>
      <Suspense fallback={<ModuleLoader />}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Suspense>
    </Router>
  </ContextProviderApp>
);

render(<Root />, entry);
