import styled from 'styled-components';

export interface IProps {
  size?: 'small';
  circle?: boolean;
}

export const AvatarImg = styled.img<IProps>`
  height: ${({ size }) => (size === 'small' ? '2rem' : undefined)};
  width: ${({ size }) => (size === 'small' ? '2rem' : undefined)};
  border-radius: ${({ circle }) => (circle ? '50%' : undefined)};
`;
