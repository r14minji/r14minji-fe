import type { AppProps } from 'next/app';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { wrapper } from '../store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../store/configureStore';

setupMSW();

function MyApp({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <GlobalStyle />
      <Background />
      <Content>
        <QueryClientProvider client={queryClient}>
          <PersistGate persistor={persistor} loading={null}>
            <Component {...pageProps} />
          </PersistGate>
        </QueryClientProvider>
      </Content>
    </>
  );
}

//export default MyApp;

export default wrapper.withRedux(MyApp);

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
