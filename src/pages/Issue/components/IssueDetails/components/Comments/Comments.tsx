import React, { FC, useEffect } from 'react';

import { IApiRepositoryIssue } from '../../../../../../api';
import { useContextApp } from '../../../../../../modules/app/context/app';
import { User } from '../../../../../../ui';
import { Box } from '../../../../../../ui/styled';

interface IProps {
  issueNumber: IApiRepositoryIssue['number'];
}

export const Comments: FC<IProps> = ({ issueNumber }) => {
  const {
    actions: { issueCommentsByNumberGet },
    state: { selectedRepositoryIssueComments },
  } = useContextApp();

  useEffect(() => {
    (async () => {
      if (issueNumber) {
        await issueCommentsByNumberGet(issueNumber);
      }
    })();
  }, [issueCommentsByNumberGet, issueNumber]);

  return (
    <>
      {selectedRepositoryIssueComments
        ? selectedRepositoryIssueComments.map(
            ({ body, id, created_at, user }) => (
              <Box key={id}>
                <Box display="flex">
                  <User
                    avtarUrl={user.avatar_url}
                    login={user.login}
                    accountUrl={user.html_url}
                  />{' '}
                  - {created_at}
                </Box>
                <Box>
                  <Box>{body}</Box>
                </Box>
              </Box>
            ),
          )
        : null}
    </>
  );
};
