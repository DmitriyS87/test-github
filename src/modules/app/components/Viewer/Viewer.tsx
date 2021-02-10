import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Issue, Main, PageNotFound } from '../../../../pages';
import { Wrapper } from '../../../../ui/styled';
import { AppMain } from './Viewer.style';

export const Viewer: FC = () => (
  <AppMain>
    <Wrapper>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/issue" component={Issue} />
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </Wrapper>
  </AppMain>
);
