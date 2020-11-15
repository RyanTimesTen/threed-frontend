import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'urql';
import { AuthForm } from './AuthForm';
import { LabelInputWrapper, Header, Input, Button } from './styled';

const AccountInfo = styled.div`
  ${LabelInputWrapper} {
    margin-bottom: 1rem;
  }
`;

export function Account() {
  const [{ fetching, data }, refetchMe] = useQuery({
    query: `
      {
        me {
          id
          avatar
          createdAt
          username
        }
      } 
    `,
  });

  function handleLogout() {
    localStorage.removeItem('token');
    refetchMe({ requestPolicy: 'network-only' });
  }

  function handleSuccess(token: string) {
    localStorage.setItem('token', token);
    refetchMe({ requestPolicy: 'network-only' });
  }

  if (fetching) {
    return <p>loading</p>;
  }

  if (data?.me) {
    return (
      <>
        <Header>Account</Header>
        <AccountInfo>
          <LabelInputWrapper>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" disabled value={data.me.username} />
          </LabelInputWrapper>
          <Button onClick={handleLogout}>Logout</Button>
        </AccountInfo>
      </>
    );
  }

  return <AuthForm onSuccess={handleSuccess} />;
}
