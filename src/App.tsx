import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider } from './contexts/AuthenticationContext';
import { LoaderProvider } from './contexts/LoaderContext';
import Routes from './routes';

const App: React.FunctionComponent = () => (
  <Router>
    <LoaderProvider>
      <AuthenticationProvider>
        <Routes />
      </AuthenticationProvider>
    </LoaderProvider>
  </Router>
);

export default App;
