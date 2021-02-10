import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { IssueDetails } from './IssueDetails';

export const Issue: FC = () => (
  <Switch>
    <Route path="/issue/:number?" component={IssueDetails} />
    <Redirect to="/" />
  </Switch>
);
