import { IApiUserRepository } from '@api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

interface IProps {
  isLoading?: boolean;
  onClick: (repo: IApiUserRepository) => void;
  repos: IApiUserRepository[];
}

const useStyles = makeStyles<Theme>(({ palette }) => ({
  container: {
    width: '14rem',
  },
  list: {
    maxHeight: '60vh',
    overflow: 'hidden',
    overflowY: 'auto',
  },
}));

export const UserRepositoriesList: FC<IProps> = ({
  isLoading,
  onClick,
  repos,
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <List
        className={classes.list}
        component="nav"
        aria-label="main mailbox folders"
      >
        {repos.map((repo) => (
          <ListItem
            button
            disabled={isLoading}
            key={repo.id}
            onClick={() => onClick(repo)}
          >
            <ListItemText primary={repo.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
