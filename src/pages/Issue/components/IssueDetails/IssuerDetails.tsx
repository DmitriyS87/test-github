import { IApiRepositoryIssue } from '@api';
import { useContextApp } from '@modules';
import { ModuleLoader, User } from '@ui';
import { Box } from '@ui';
import { useSnackbar } from 'notistack';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Comments } from './components';
import {
  Issue,
  IssueDescription,
  IssueTitle,
  IssueTitleMeta,
} from './issueDetails.style';

export const IssueDetails: FC = () => {
  const {
    actions: { issueByNumberGet },
  } = useContextApp();

  const { enqueueSnackbar } = useSnackbar();
  const [issue, setIssue] = useState<IApiRepositoryIssue | undefined>();

  const params = useParams<{
    number?: string;
  }>();

  const issueNumber = useMemo(
    () =>
      params.number && !isNaN(Number(params.number))
        ? +params.number
        : undefined,
    [params.number],
  );

  useEffect(() => {
    if (issueNumber) {
      (async () => {
        try {
          const issueData = await issueByNumberGet(issueNumber);
          setIssue(issueData);
        } catch (err) {
          enqueueSnackbar(err && err.message ? err.message : err, {
            variant: 'error',
          });
        }
      })();
    }
  }, [enqueueSnackbar, issueByNumberGet, issueNumber]);

  return (
    <>
      {issueNumber && issue ? (
        <Issue>
          <Box display="flex" alignItems="center" padding="0.5rem 0">
            <IssueTitle>
              #{issue.number} - {issue.title}
            </IssueTitle>
            <IssueTitleMeta alignItems="center" display="flex" margin="1rem 0">
              {' '}
              {issue.created_at} created by{' '}
              <User
                avtarUrl={issue.user.avatar_url}
                login={issue.user.login}
                accountUrl={issue.user.html_url}
              />
            </IssueTitleMeta>
          </Box>
          <Box backgroundColor="beige">
            <IssueDescription>{issue.body}</IssueDescription>
          </Box>
          <Box>
            <Comments issueNumber={issueNumber} />
          </Box>
        </Issue>
      ) : (
        <ModuleLoader />
      )}
    </>
  );
};
