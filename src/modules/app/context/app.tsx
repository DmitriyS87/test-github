import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  ApiRepository,
  ApiUser,
  IApiRepositoryIssue,
  IApiUser,
  IApiUserRepository,
} from '../../../api';

interface IContextApp {
  actions: {
    accountDataGet: typeof ApiUser.retrieve;
    accountRepositoriesGet: typeof ApiUser.repositoriesList;
    repositoryIssuesGet: typeof ApiRepository.issuesList;
    setSelectedRepository: React.Dispatch<IApiUserRepository>;
  };
  state: {
    account: IApiUser | null;
    accountRepositories: IApiUserRepository[] | null;
    selectedRepository: IApiUserRepository | null;
    selectedRepositoryIssues: IApiRepositoryIssue[];
  };
}

const ContextApp = createContext<IContextApp>((null as unknown) as IContextApp);

export const ContextProviderApp: FC = ({ children }) => {
  const [account, setAccount] = useState<IContextApp['state']['account']>(null);
  const [accountRepositories, setAccountRepositories] = useState<
    IContextApp['state']['accountRepositories']
  >(null);
  const [selectedRepository, setSelectedRepository] = useState<
    IContextApp['state']['selectedRepository']
  >(null);
  const [selectedRepositoryIssues, setSelectedRepositoryIssues] = useState(
    null,
  );

  const accountDataGet: IContextApp['actions']['accountDataGet'] = useCallback(
    async (body) => {
      const user = await ApiUser.retrieve(body);
      user && setAccount(user);
      return user;
    },
    [],
  );

  const accountRepositoriesGet: IContextApp['actions']['accountRepositoriesGet'] = useCallback(
    async (param) => {
      const repositoriesList = await ApiUser.repositoriesList(param);
      repositoriesList && setAccountRepositories(repositoriesList);
      return repositoriesList;
    },
    [],
  );

  const repositoryIssuesGet: IContextApp['actions']['repositoryIssuesGet'] = useCallback(
    async (param) => {
      console.log({ param });
      const issues = ApiRepository.issuesList(param);
      setSelectedRepositoryIssues(issues);
      return issues;
    },
    [],
  );

  return useMemo(
    () => (
      <ContextApp.Provider
        value={{
          actions: {
            accountDataGet,
            accountRepositoriesGet,
            repositoryIssuesGet,
            setSelectedRepository,
          },
          state: {
            account,
            accountRepositories,
            selectedRepository,
            selectedRepositoryIssues,
          },
        }}
      >
        {children}
      </ContextApp.Provider>
    ),
    [
      account,
      accountDataGet,
      accountRepositories,
      accountRepositoriesGet,
      children,
      repositoryIssuesGet,
      selectedRepository,
      selectedRepositoryIssues,
    ],
  );
};

export const useContextApp = () => useContext(ContextApp);
