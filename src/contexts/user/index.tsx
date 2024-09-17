import React, { createContext, useMemo } from "react";
import { UserContextProps, State, User } from "./types";
import { reducer } from "./user-reducer";

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

const initialState: State = {
  user: {} as User,
  isLoading: false,
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

