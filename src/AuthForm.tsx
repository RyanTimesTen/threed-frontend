import * as React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import { Input, Button, Header, LabelInputWrapper } from './styled';

const AuthModeButton = styled.button`
  font-size: inherit;
  background-color: inherit;
  color: inherit;
  border: none;
`;

const Form = styled.form`
  ${Input} {
    margin-bottom: 1.25rem;
  }

  ${Button} {
    margin-top: 1.25rem;
  }
`;

type AuthMode = 'signin' | 'signup';

type AuthFormProps = {
  onSuccess: (token: string) => void;
};

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authMode, setAuthMode] = React.useState<AuthMode>('signin');

  const [{ fetching: signupFetching }, signup] = useMutation(`
    mutation SignUp($username: String!, $password: String!) {
      signup(username: $username, password: $password) {
        token
      }
    } 
  `);

  const [{ fetching: signinFetching }, signin] = useMutation(`
    mutation SignIn($username: String!, $password: String!) {
      signin(username: $username, password: $password) {
        token
      }
    } 
  `);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    const authFn = authMode === 'signin' ? signin : signup;
    const { data } = await authFn({ username, password });
    if (data) {
      onSuccess(data[authMode].token);
    }
  }

  return (
    <>
      <Header>{authMode === 'signin' ? 'Sign In' : 'Sign Up'}</Header>
      <Form onSubmit={handleSubmit}>
        <LabelInputWrapper>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </LabelInputWrapper>

        <LabelInputWrapper>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputWrapper>

        <AuthModeButton
          type="button"
          onClick={() => setAuthMode((mode) => (mode === 'signin' ? 'signup' : 'signin'))}
        >
          {authMode === 'signin'
            ? "Don't have an account yet? Click here"
            : 'Already have an account? Click here'}
        </AuthModeButton>

        <Button type="submit" disabled={signinFetching || signupFetching}>
          {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </Form>
    </>
  );
}
