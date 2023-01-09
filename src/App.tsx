import React from 'react';
import styled from 'styled-components';

import AppInner from './AppInner';
import Provider from './store/Provider';
import GlobalStyles from './styles/GlobalStyles';

const BaseLayout = styled.section`
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  return (
    <BaseLayout>
      <GlobalStyles />
      <Provider>
        <AppInner />
      </Provider>
    </BaseLayout>
  );
};

export default App;
