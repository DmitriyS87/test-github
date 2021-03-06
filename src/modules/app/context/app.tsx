import {
  ApiRepository,
  ApiUser,
  IApiRepositiryIssueComment,
  IApiRepositoryIssue,
  IApiUser,
  IApiUserRepository,
} from '@api';
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface IContextApp {
  actions: {
    accountDataGet: typeof ApiUser.retrieve;
    accountRepositoriesGet: typeof ApiUser.repositoriesList;
    clearRepositoryIssueCommentsData: () => void;
    clearRepositoryIssues: () => void;
    clearSelectedRepositoryData: () => void;
    issueByNumberGet: (
      name: IApiRepositoryIssue['number'],
    ) => Promise<IApiRepositoryIssue>;
    issueCommentsByNumberGet: (
      name: IApiRepositoryIssue['number'],
    ) => Promise<IApiRepositiryIssueComment[]>;
    repositoryIssueCommentsByNumberGet: typeof ApiRepository.issueCommentsList;
    repositoryIssueByNumberGet: typeof ApiRepository.issue;
    repositoryIssuesGet: typeof ApiRepository.issuesList;
    resetAllpreviouseUserData: () => void;
    setSelectedRepository: React.Dispatch<IApiUserRepository>;
  };
  state: {
    account: IApiUser | null;
    accountRepositories: IApiUserRepository[] | null;
    selectedRepository: IApiUserRepository | null;
    selectedRepositoryIssues: IApiRepositoryIssue[] | null;
    selectedRepositoryIssueComments: IApiRepositiryIssueComment[] | null;
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
  const [selectedRepositoryIssues, setSelectedRepositoryIssues] = useState<
    IContextApp['state']['selectedRepositoryIssues']
  >(null);
  const [
    selectedRepositoryIssueComments,
    setSelectedRepositoryIssueComments,
  ] = useState<IContextApp['state']['selectedRepositoryIssueComments']>(null);

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

  const repositoryIssueByNumberGet: IContextApp['actions']['repositoryIssueByNumberGet'] = useCallback(
    async (param) => await ApiRepository.issue(param),
    [],
  );

  const repositoryIssueCommentsByNumberGet: IContextApp['actions']['repositoryIssueCommentsByNumberGet'] = useCallback(
    async (param) => await ApiRepository.issueCommentsList(param),
    [],
  );

  const issueByNumberGet: IContextApp['actions']['issueByNumberGet'] = useCallback(
    async (issue_number) => {
      const issueFromCurrentRepositoryIssuesList =
        selectedRepositoryIssues &&
        selectedRepositoryIssues.find((issue) => issue.number === issue_number);

      if (issueFromCurrentRepositoryIssuesList) {
        return Promise.resolve(issueFromCurrentRepositoryIssuesList);
      }

      if (
        !selectedRepository ||
        !selectedRepository.owner ||
        !selectedRepository.name
      ) {
        throw new Error(
          'The first you should set user and geat his repositories to get issue',
        );
      }

      return await repositoryIssueByNumberGet({
        number: issue_number,
        owner: selectedRepository?.owner.login,
        repo: selectedRepository?.name,
      });
    },
    [repositoryIssueByNumberGet, selectedRepository, selectedRepositoryIssues],
  );

  const issueCommentsByNumberGet: IContextApp['actions']['issueCommentsByNumberGet'] = useCallback(
    async (issue_number) => {
      if (
        !selectedRepository ||
        !selectedRepository.owner ||
        !selectedRepository.name
      ) {
        throw new Error(
          'The first you should set user and geat his repositories to get issue',
        );
      }
      const comments = await repositoryIssueCommentsByNumberGet({
        number: issue_number,
        owner: selectedRepository.owner.login,
        repo: selectedRepository.name,
      });
      setSelectedRepositoryIssueComments(comments);
      return comments;
    },
    [repositoryIssueCommentsByNumberGet, selectedRepository],
  );

  const repositoryIssuesGet: IContextApp['actions']['repositoryIssuesGet'] = useCallback(
    async (param) => {
      const issues = await ApiRepository.issuesList(param);
      setSelectedRepositoryIssues(issues);
      return issues;
    },
    [],
  );

  const clearSelectedRepositoryData: IContextApp['actions']['clearSelectedRepositoryData'] = useCallback(() => {
    setAccountRepositories(null);
  }, []);

  const clearRepositoryIssueCommentsData: IContextApp['actions']['clearRepositoryIssueCommentsData'] = useCallback(() => {
    setSelectedRepositoryIssueComments(null);
  }, []);

  const clearRepositoryIssues: IContextApp['actions']['clearRepositoryIssues'] = useCallback(() => {
    setSelectedRepositoryIssues(null);
  }, []);

  const resetAllpreviouseUserData: IContextApp['actions']['resetAllpreviouseUserData'] = useCallback(() => {
    setSelectedRepository(null);
    clearRepositoryIssueCommentsData();
    clearRepositoryIssues();
    clearSelectedRepositoryData();
  }, [
    clearRepositoryIssueCommentsData,
    clearRepositoryIssues,
    clearSelectedRepositoryData,
  ]);

  return useMemo(
    () => (
      <ContextApp.Provider
        value={{
          actions: {
            accountDataGet,
            accountRepositoriesGet,
            clearRepositoryIssueCommentsData,
            clearRepositoryIssues,
            clearSelectedRepositoryData,
            issueByNumberGet,
            issueCommentsByNumberGet,
            repositoryIssueByNumberGet,
            repositoryIssueCommentsByNumberGet,
            repositoryIssuesGet,
            resetAllpreviouseUserData,
            setSelectedRepository,
          },
          state: {
            account,
            accountRepositories,
            selectedRepository,
            selectedRepositoryIssueComments,
            selectedRepositoryIssues,
          },
        }}
      >
        {children}
      </ContextApp.Provider>
    ),
    [
      accountDataGet,
      accountRepositoriesGet,
      clearRepositoryIssueCommentsData,
      clearRepositoryIssues,
      clearSelectedRepositoryData,
      issueByNumberGet,
      issueCommentsByNumberGet,
      repositoryIssueByNumberGet,
      repositoryIssueCommentsByNumberGet,
      repositoryIssuesGet,
      resetAllpreviouseUserData,
      account,
      accountRepositories,
      selectedRepository,
      selectedRepositoryIssueComments,
      selectedRepositoryIssues,
      children,
    ],
  );
};

export const useContextApp = () => useContext(ContextApp);
