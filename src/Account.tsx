import * as React from 'react';
import styled from 'styled-components';
import { AuthForm } from './AuthForm';
import { LabelInputWrapper, Header, Input, Button } from './styled';
import { useUser } from './User';

const AccountInfo = styled.div`
  ${LabelInputWrapper} {
    margin-bottom: 1rem;
  }
`;

export function Account() {
  const { fetching, user, refetch } = useUser();

  function handleLogout() {
    localStorage.removeItem('token');
    refetch({ requestPolicy: 'network-only' });
  }

  function handleSuccess(token: string) {
    localStorage.setItem('token', token);
    refetch({ requestPolicy: 'network-only' });
  }

  if (fetching) {
    return <p>loading</p>;
  }

  if (user) {
    return (
      <>
        <Header>Account</Header>
        <AccountInfo>
          <LabelInputWrapper>
            <label htmlFor="username">Username</label>
            <Input id="username" type="text" disabled value={user.username} />
          </LabelInputWrapper>
          <Button onClick={handleLogout}>Logout</Button>
        </AccountInfo>
      </>
    );
  }

  return <AuthForm onSuccess={handleSuccess} />;
}
