import { Box } from '@ui/styled';
import styled from 'styled-components';

export const RepositoryMeta = styled(Box)`
  font-style: italic;
`;

export const IssuesBody = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IssuesTitle = styled(Box)`
  font-weight: 600;
`;
