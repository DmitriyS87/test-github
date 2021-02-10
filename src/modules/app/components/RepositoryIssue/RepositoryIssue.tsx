import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { FC } from 'react';

import { IApiRepositoryIssue } from '../../../../api';

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
            <Link href={html_url} target="_blank" rel="noopener">
              <Box display="flex" alignItems="center">
                <Box>
                  {avatar_url ? (
                    <Avatar className={classes.avatarImg} src={avatar_url} />
                  ) : (
                    <AccountCircleIcon className={classes.avatarImg} />
                  )}
                </Box>
                <Box>{login}</Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
