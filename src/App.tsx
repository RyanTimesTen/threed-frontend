import React from 'react';
import { useQuery } from 'urql';
import { BrowserRouter as Router, Link as BaseLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Account } from './Account';
import { UserIcon } from './UserIcon';
import { HomeIcon } from './HomeIcon';
import { routes } from './routes';
import { Header } from './styled';

function Threads() {
  const [{ fetching, data, error }] = useQuery({
    query: `
      {
        threads(sortBy: LATEST) {
          id
          title
          likesNumber
        }
      } 
    `,
  });

  return (
    <div>
      {fetching && <p>loading</p>}
      {error && <p>something went wrong</p>}
      <Header>Threads</Header>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

const Nav = styled.nav`
  padding: 1.25rem 0;
  display: flex;
  justify-content: space-between;
`;

function App() {
  return (
    <Router>
      <Nav>
        <BaseLink to={routes.home}>
          <HomeIcon />
        </BaseLink>
        <BaseLink to={routes.account}>
          <UserIcon />
        </BaseLink>
      </Nav>
      <Routes>
        <Route path={routes.home} element={<Threads />} />
        <Route path={routes.account} element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
