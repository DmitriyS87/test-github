import React, { FC } from 'react';

import { AvatarImg, Box, Link } from '../styled';

interface IProps {
  avtarUrl: string;
  login: string;
  accountUrl: string;
}

export const User: FC<IProps> = ({ accountUrl, avtarUrl, login }) => (
  <Box padding="0 0.5rem">
    <Link href={accountUrl} target="_blank" rel="noopener">
      <Box display="flex" alignItems="center">
        {avtarUrl && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <AvatarImg circle size="small" src={avtarUrl} />
          </Box>
        )}
        <Box margin="0 0 0 1rem">{login}</Box>
      </Box>
    </Link>
  </Box>
);
