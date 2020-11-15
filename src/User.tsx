import * as React from 'react';
import { CombinedError, OperationContext, useQuery } from 'urql';

type UserContextValue = {
  fetching: boolean;
  user: any; // TODO: codegen
  error: CombinedError | undefined;
  refetch: (opts?: Partial<OperationContext> | undefined) => void;
};

const UserContext = React.createContext<UserContextValue>(undefined as any);

export const UserProvider: React.FC = ({ children }) => {
  const [{ fetching, data, error }, refetch] = useQuery({
    query: `
      {
        user: me {
          id
          avatar
          createdAt
          username
        }
      } 
    `,
  });

  const value = React.useMemo(
    () => ({
      fetching,
      user: data?.user,
      error,
      refetch,
    }),
    [data?.user, error, fetching, refetch]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}
