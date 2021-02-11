import { IApiRepositoryIssue } from '@api';
import Grid from '@material-ui/core/Grid';
import { User } from '@ui';
import { Box } from '@ui';
import React, { FC } from 'react';

import {
  IssuesBody,
  IssuesTitle,
  RepositoryMeta,
} from './RepositoryIssue.style';

interface IProps {
  issue: IApiRepositoryIssue;
}

export const RepositoryIssue: FC<IProps> = ({ issue }) => {
  const { body, created_at, number, state, title, user } = issue;
  const { avatar_url, login, html_url } = user;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box padding=".6rem 1rem">
          <IssuesTitle padding="0.5rem 0">{title}</IssuesTitle>
          <IssuesBody padding="0.5rem 0">{body}</IssuesBody>
          <RepositoryMeta alignItems="center" display="flex" padding=".8rem 0">
            <Box>{`${number} - ${state} `}</Box>
            <Box padding="0.3rem 0.5rem">{`created at ${created_at}`}</Box>
            <User avtarUrl={avatar_url} login={login} accountUrl={html_url} />
          </RepositoryMeta>
        </Box>
      </Grid>
    </Grid>
  );
};
