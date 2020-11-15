import React from 'react';
import { useQuery } from 'urql';
import { BrowserRouter as Router, Link as BaseLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Account } from './Account';
import { UserIcon } from './UserIcon';
import { HomeIcon } from './HomeIcon';
import { routes } from './routes';
import { Header, buttonStyles } from './styled';
import { useUser } from './User';

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
  align-items: center;
`;

const Link = styled(BaseLink)`
  ${buttonStyles}
  max-width: 100px;
  padding: 0.5rem;
  text-decoration: none;
  text-align: center;
`;

function App() {
  const { user } = useUser();

  return (
    <Router>
      <Nav>
        <BaseLink to={routes.home}>
          <HomeIcon />
        </BaseLink>
        {user ? (
          <BaseLink to={routes.account}>
            <UserIcon />
          </BaseLink>
        ) : (
          <Link to={routes.account}>Sign In</Link>
        )}
      </Nav>
      <Routes>
        <Route path={routes.home} element={<Threads />} />
        <Route path={routes.account} element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
