import CircularProgress from '@material-ui/core/CircularProgress';
import React, { FC } from 'react';

import { Box } from '../styled';

export const ModuleLoader: FC = () => (
  <Box display="flex" alignItems="center" justifyContent="center">
    <CircularProgress />
  </Box>
);
