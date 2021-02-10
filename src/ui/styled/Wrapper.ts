import styled from 'styled-components';

import { device } from '../utils';

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 100%;

  @media ${device.sm} {
    max-width: 500px;
  }

  @media ${device.md} {
    max-width: 800px;
  }

  @media ${device.lg} {
    max-width: 1120px;
  }

  @media ${device.xl} {
    max-width: 1300px;
  }
`;
