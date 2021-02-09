import React, { createContext, FC, useContext, useMemo } from "react";
import { ApiUsers } from "../../../api";

interface IContextApp {
  actions: {
    accountDataGet: typeof ApiUsers.retrieve;
    accountsList: typeof ApiUsers.list;
  };
  state: {};
}

const ContextApp = createContext<IContextApp>((null as unknown) as IContextApp);

export const ContextProviderApp: FC = ({ children }) => {
  const accountDataGet: IContextApp["actions"]["accountDataGet"] = (body) => {
    return ApiUsers.retrieve(body);
  };
  const accountsList: IContextApp["actions"]["accountsList"] = () => {
    return ApiUsers.list();
  };

  return useMemo(
    () => (
      <ContextApp.Provider
        value={{
          actions: { accountDataGet, accountsList },
          state: {},
        }}
      >
        {children}
      </ContextApp.Provider>
    ),
    []
  );
};

export const useContextApp = () => useContext(ContextApp);
