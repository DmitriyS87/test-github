import { Link, Wrapper } from '@ui';
import React, { FC } from 'react';

import { AppFooter } from './Footer.style';

export const Footer: FC = () => (
  <AppFooter>
    <Wrapper>
      <p>
        made by{' '}
        <Link
          colorScheme="dark"
          href="https://career.habr.com/dschukin2"
          target="_blank"
        >
          Dmitriy Schukin
        </Link>
      </p>
    </Wrapper>
  </AppFooter>
);
