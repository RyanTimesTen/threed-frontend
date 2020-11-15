import React from 'react';
import { useQuery } from 'urql';
import { BrowserRouter as Router, Link as BaseLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

<<<<<<< Updated upstream
=======
import { Account } from './Account';
import { UserIcon } from './UserIcon';
import { HomeIcon } from './HomeIcon';
import { routes } from './routes';
import { buttonStyles, Header } from './styled';
import { useUser } from './User';

>>>>>>> Stashed changes
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
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

<<<<<<< Updated upstream
function SignUp() {
  return <p>signup page</p>;
}

const Link = styled(BaseLink)`
  text-decoration: none;
  color: inherit;
=======
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
>>>>>>> Stashed changes
`;

function App() {
  const { user } = useUser();

  return (
    <Router>
<<<<<<< Updated upstream
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
=======
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
>>>>>>> Stashed changes
      <Routes>
        <Route path="/" element={<Threads />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
