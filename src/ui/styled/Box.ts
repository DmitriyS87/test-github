import { CSSProperties } from 'react';
import styled from 'styled-components';

interface IBoxProps {
  alignItems?: CSSProperties['alignItems'];
  backgroundColor?: string;
  display?: CSSProperties['display'];
  justifyContent?: CSSProperties['justifyContent'];
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
}

export const Box = styled.div<IBoxProps>`
  align-items: ${({ alignItems }) => alignItems || undefined};
  background-color: ${({ backgroundColor }) => backgroundColor || undefined};
  display: ${({ display }) => display || undefined};
  justify-content: ${({ justifyContent }) => justifyContent || undefined};
  margin: ${({ margin }) => margin || undefined};
  padding: ${({ padding }) => padding || undefined};
`;
