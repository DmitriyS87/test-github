import { IApiRepositoryIssue, IApiUserRepository } from '@api';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import { useContextApp } from '@modules';
import { Box } from '@ui';
import { FormTextField } from '@ui';
import { Formik, FormikConfig } from 'formik';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RepositoryIssue, UserRepositoriesList } from '.';

interface IFormValues {
  repo: string;
  user: string;
}

export const Main: FC = () => {
  const {
    actions: {
      accountDataGet,
      accountRepositoriesGet,
      clearRepositoryIssueCommentsData,
      clearRepositoryIssues,
      setSelectedRepository,
      repositoryIssuesGet,
      resetAllpreviouseUserData,
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
  const [
    isRepositoriesSubmitting,
    setIsRepositoriesSubmitting,
  ] = useState<boolean>(false);
  const [isIssuesSubmitting, setIsIssuesSubmitting] = useState<boolean>(false);

  const anchorRef = useRef<HTMLInputElement>();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (account && account.login && !accountRepositories) {
        try {
          console.log('account.login', account.login);
          setIsRepositoriesSubmitting(true);
          await accountRepositoriesGet({ login: account.login });
          setIsRepositoriesSubmitting(false);
          handleRepositoryListOpen();
        } catch (err) {
          resetAllpreviouseUserData();
          enqueueSnackbar(err && err.message ? err.message : err, {
            variant: 'error',
          });
        }
      }
    })();
  }, [
    account,
    accountRepositories,
    accountRepositoriesGet,
    enqueueSnackbar,
    resetAllpreviouseUserData,
  ]);

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
        await resetAllpreviouseUserData();
      } catch (err) {
        enqueueSnackbar(err && err.message ? err.message : err, {
          variant: 'error',
        });
      }
    },
    [accountDataGet, enqueueSnackbar, resetAllpreviouseUserData],
  );

  const handleInputFocus = useCallback(() => {
    account && !isRepositoryListOpen && handleRepositoryListOpen();
  }, [account, isRepositoryListOpen]);

  const handleIssueClick = (issue_number: IApiRepositoryIssue['number']) => {
    history.push(`/issue/${issue_number}`);
  };

  const handleRepositoryListClose = () => {
    setRepositoryListOpen(false);
  };

  const handleRepositoryListOpen = () => {
    setRepositoryListOpen(true);
  };

  const handleSelectRepository = async (repo: IApiUserRepository) => {
    setSelectedRepository(repo);
    try {
      if (!account.login && !repo.name) {
        throw new Error(
          'The first you should load user repositories to select one',
        );
      }
      setIsIssuesSubmitting(true);
      clearRepositoryIssueCommentsData();
      clearRepositoryIssues();
      await repositoryIssuesGet({ owner: account.login, repo: repo.name });
      setIsIssuesSubmitting(false);
      handleRepositoryListClose();
    } catch (err) {
      enqueueSnackbar(err && err.message ? err.message : err, {
        variant: 'error',
      });
      setIsIssuesSubmitting(false);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" variantMapping={{ h3: 'h1' }}>
            {selectedRepository ? (
              <span>
                <strong>{selectedRepository.name}</strong> Issues:
              </span>
            ) : account ? (
              <span>
                Set <strong>{account.login}</strong> repository:
              </span>
            ) : (
              <span>Load user repository's data.</span>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik
            enableReinitialize
            initialValues={initialValue}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item>
                    <FormControl>
                      <FormTextField
                        autoComplete="off"
                        disabled={isSubmitting || isRepositoriesSubmitting}
                        name="user"
                        onFocus={handleInputFocus}
                        placeholder="enter user name"
                        ref={anchorRef}
                        variant="standard"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={isSubmitting || isRepositoriesSubmitting}
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
              <ClickAwayListener onClickAway={handleRepositoryListClose}>
                <Box>
                  {accountRepositories ? (
                    <UserRepositoriesList
                      isLoading={isIssuesSubmitting}
                      onClick={handleSelectRepository}
                      repos={accountRepositories}
                    />
                  ) : (
                    <Typography>Loading...</Typography>
                  )}
                </Box>
              </ClickAwayListener>
            </Popper>
          )}
        </Grid>
        <Grid item xs={12}>
          {selectedRepositoryIssues ? (
            selectedRepositoryIssues.length ? (
              selectedRepositoryIssues.map((issue) => (
                <Card key={issue.id}>
                  <CardActionArea
                    onClick={() => handleIssueClick(issue.number)}
                  >
                    <RepositoryIssue issue={issue} />
                  </CardActionArea>
                </Card>
              ))
            ) : (
              <Typography>No issues for selected repository found.</Typography>
            )
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};
