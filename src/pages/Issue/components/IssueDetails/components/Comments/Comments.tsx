import { IApiRepositoryIssue } from '@api';
import { useContextApp } from '@modules/app/context/app';
import { User } from '@ui';
import { Box } from '@ui/styled';
import { useSnackbar } from 'notistack';
import React, { FC, useEffect } from 'react';

import { CommentBody, CommentContainer } from './Comments.style';

interface IProps {
  issueNumber: IApiRepositoryIssue['number'];
}

export const Comments: FC<IProps> = ({ issueNumber }) => {
  const {
    actions: { clearRepositoryIssueCommentsData, issueCommentsByNumberGet },
    state: { selectedRepositoryIssueComments },
  } = useContextApp();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      if (issueNumber) {
        try {
          clearRepositoryIssueCommentsData();
          await issueCommentsByNumberGet(issueNumber);
        } catch (err) {
          enqueueSnackbar(
            "Can't get issue's comments data. Please try again later.",
            {
              variant: 'error',
            },
          );
        }
      }
    })();
  }, [
    clearRepositoryIssueCommentsData,
    enqueueSnackbar,
    issueCommentsByNumberGet,
    issueNumber,
  ]);

  return (
    <>
      {selectedRepositoryIssueComments
        ? selectedRepositoryIssueComments.map(
            ({ body, id, created_at, user }) => (
              <CommentContainer key={id}>
                <Box display="flex">
                  <User
                    avtarUrl={user.avatar_url}
                    login={user.login}
                    accountUrl={user.html_url}
                  />{' '}
                  - {created_at}
                </Box>
                <Box>
                  <CommentBody>{body}</CommentBody>
                </Box>
              </CommentContainer>
            ),
          )
        : null}
    </>
  );
};
