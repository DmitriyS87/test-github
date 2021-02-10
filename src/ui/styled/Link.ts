import styled from 'styled-components';

interface LinkProps {
  colorScheme?: 'light' | 'dark';
}

export const Link = styled.a<LinkProps>`
  text-decoration: none;
  color: ${({ colorScheme }) =>
    colorScheme === 'dark' ? 'cornflowerblue' : 'blueviolet'};

  &:hover {
    color: ${({ colorScheme }) =>
      colorScheme === 'dark' ? 'blueviolet' : 'cornflowerblue'};
  }
`;
