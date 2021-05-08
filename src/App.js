import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './hooks';
import { Routes } from './routes';
import { GlobalStyle } from './styles/global';
import { Suspense } from 'react';
import { Loading } from './components/Common/Loading';
import { Header } from './components/App/Header'
import { AppContainer } from './styles/layout';

export function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <AppProvider>
          <Header />
          <AppContainer>
            <Routes />
          </AppContainer>
        </AppProvider>
        <GlobalStyle />
      </Suspense>
    </Router>
  );
}