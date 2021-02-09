import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import { Formik, FormikConfig } from 'formik';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { IApiUserRepository } from '../../api';
import { FormTextField } from '../../ui';
import { UserRepositoriesList } from './components/UserRepositoriesList/UserRepositoriesList';
import { useContextApp } from './context/app';

interface IFormValues {
  repo: string;
  user: string;
}

export const App: FC = () => {
  const {
    actions: {
      accountDataGet,
      accountRepositoriesGet,
      setSelectedRepository,
      repositoryIssuesGet,
    },
    state: {
      account,
      accountRepositories,
      selectedRepository,
      selectedRepositoryIssues,
    },
  } = useContextApp();
  const [isRepositoryListOpen, setRepositoryListOpen] = useState<boolean>(
    false,
  );
  const anchorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (account) {
      handleRepositoryListOpen();
      accountRepositoriesGet({ login: account.login });
    }
  }, [account, accountRepositoriesGet]);

  const initialValue = {
    repo: '',
    user: account?.login || '',
  };

  const onSubmit: FormikConfig<IFormValues>['onSubmit'] = useCallback(
    async ({ user }) => {
      try {
        if (!user)
          throw new Error(
            'You should enter a user name orlogin to get user data!',
          );
        await accountDataGet({ name: user });
      } catch (err) {
        console.error(err);
      }
    },
    [accountDataGet],
  );

  const handleRepositoryListOpen = () => {
    setRepositoryListOpen(true);
  };

  const handleRepositoryListClose = () => {
    setRepositoryListOpen(false);
  };

  const handleSelectRepository = (repo: IApiUserRepository) => {
    setSelectedRepository(repo);
    try {
      repositoryIssuesGet({ owner: account.login, repo: repo.name });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className="wrapper">
      <Box mb={2}>header</Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" variantMapping={{ h3: 'h1' }}>
              Load user repository's data.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik initialValues={initialValue} onSubmit={onSubmit}>
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <FormControl>
                        <FormTextField
                          name="user"
                          placeholder="enter user name"
                          ref={anchorRef}
                          variant="standard"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                      >
                        <Typography>load</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
            {isRepositoryListOpen && (
              <Popper
                anchorEl={anchorRef.current}
                open={true}
                placement="bottom"
                transition
              >
                {({ TransitionProps, placement }) => (
                  // <Grow {...TransitionProps}>
                  <ClickAwayListener onClickAway={handleRepositoryListClose}>
                    <Box>
                      {accountRepositories ? (
                        <UserRepositoriesList
                          onClick={handleSelectRepository}
                          repos={accountRepositories}
                        />
                      ) : (
                        <Typography>Loading...</Typography>
                      )}
                    </Box>
                  </ClickAwayListener>
                  // </Grow>
                )}
              </Popper>
            )}
          </Grid>
          <Grid item xs={12}>
            {selectedRepositoryIssues &&
              // @ts-ignore
              selectedRepositoryIssues.map((issue) => (
                <Box key={issue.number}>{issue.number}</Box>
              ))}
          </Grid>
        </Grid>
      </Box>
      {account && (
        <Typography>
          {account.name
            ? account.name
            : account.login
            ? account.login
            : 'user data not found'}
        </Typography>
      )}
      <Box mt={2}>footer</Box>
    </Box>
  );
};
