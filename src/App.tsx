import React from 'react';
import { useQuery } from 'urql';
import { BrowserRouter as Router, Link as BaseLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

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

function SignUp() {
  return <p>signup page</p>;
}

const Link = styled(BaseLink)`
  text-decoration: none;
  color: inherit;
`;

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Threads />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
