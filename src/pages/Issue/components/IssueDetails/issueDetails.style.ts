import { Box } from '@ui/styled';
import styled from 'styled-components';

export const Issue = styled.div`
  padding: 1rem 0;
`;

export const IssueDescription = styled.code`
  background-color: beige;
  line-height: 1.6;
  overflow-wrap: break-word;
`;

export const IssueTitle = styled.h3`
  margin: 0;
`;

export const IssueTitleMeta = styled(Box)`
  margin-left: 1rem;
  font-style: italic;
  color: rgba(0, 0, 0, 0.6);
`;
