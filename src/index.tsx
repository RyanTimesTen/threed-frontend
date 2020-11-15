import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, Provider } from 'urql';
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components';

import App from './App';
import reportWebVitals from './reportWebVitals';

const client = createClient({
  url: 'https://threed-test-api.herokuapp.com/graphql',
  fetchOptions: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
});

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#212429',
    text: '#ffffff',
    primary: '#96ffed',
    primaryText: '#000000',
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.text};

    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1rem;
    box-sizing: border-box;
    font-size: 1.125rem;

    margin: 0 auto;
    max-width: 90%;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
