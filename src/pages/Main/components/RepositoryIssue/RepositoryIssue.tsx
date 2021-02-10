import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC } from 'react';

import { IApiRepositoryIssue } from '../../../../api';
import { User } from '../../../../ui';

interface IProps {
  issue: IApiRepositoryIssue;
}

const useStyles = makeStyles(() => ({
  avatarImg: {
    height: '2rem',
    width: '2rem',
  },
  issue: {
    padding: '.6rem 1rem',
  },
  issueBody: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export const RepositoryIssue: FC<IProps> = ({ issue }) => {
  const { body, created_at, number, state, title, user } = issue;
  const { avatar_url, login, html_url } = user;
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className={classes.issue}>
          <Box>{title}</Box>
          <Box className={classes.issueBody}>{body}</Box>
          <Box display="flex" alignItems="center">
            <Box>{`${number} - ${state} `}</Box>
            <Box>{`created at ${created_at}`}</Box>
            <User avtarUrl={avatar_url} login={login} accountUrl={html_url} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
