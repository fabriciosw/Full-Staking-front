import React, { createContext, Dispatch, ReactElement, SetStateAction, useContext, useState } from 'react';
import useOldSession from '../../utils/useOldSession';

export interface IAuth {
  isAuthenticated: boolean;
  permission?: 'none' | 'admin';
}

type authenticationProps = {
  authentication: IAuth;
  setAuthentication: Dispatch<SetStateAction<IAuth>>;
};

export const AuthenticationContext = createContext<authenticationProps>({} as authenticationProps);

export const useAuthentication = (): authenticationProps => useContext(AuthenticationContext);

export function AuthenticationProvider({ children }: { children: ReactElement }): React.ReactElement {
  const [authentication, setAuthentication] = useState<IAuth>(useOldSession());

  return (
    <AuthenticationContext.Provider value={{ authentication, setAuthentication }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
