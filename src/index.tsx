import React, { FC, Suspense } from "react";
import { createBrowserHistory } from "history";
import { render } from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import { App } from "./modules/app";

const entry = document.querySelector(".app");
const history = createBrowserHistory();

const ModuleLoader: FC = () => {
  return <div>Loading</div>;
};

const Root: FC = () => (
    <Router history={history}>
      <Suspense fallback={<ModuleLoader />}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Suspense>
    </Router>
);

render(<Root />, entry);