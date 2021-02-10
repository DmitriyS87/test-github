import React, { FC } from 'react';

import { Wrapper } from '../../../../ui/styled';
import { AppDescription, AppHeader, AppTitle } from './Header.style';

export const Header: FC = () => (
  <AppHeader>
    <Wrapper>
      <AppTitle>Github connect app</AppTitle>
      <AppDescription>
        You are able to get repositories data for entered user. Browse
        repository issues and it's comments
      </AppDescription>
    </Wrapper>
  </AppHeader>
);
