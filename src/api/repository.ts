import { apiRequest } from '../utils';
import { BASE_API_URL, IApiUserSharedData } from '.';

export interface IApiRepositiryIssueComment {
  author_association: string; // 'MEMBER'
  body: string;
  created_at: string;
  html_url: string;
  id: number;
  issue_url: string;
  node_id: string;
  performed_via_github_app: null | string; //??
  updated_at: string;
  url: string;
  user: IApiUserSharedData;
}

export interface IApiRepositoryIssue {
  active_lock_reason: null | string;
  assignee: null | string;
  assignees: string[]; //??
  author_association: string;
  body: null | string;
  closed_at: null | string;
  comments: number;
  comments_url: string;
  created_at: string;
  events_url: string;
  html_url: string;
  id: number;
  labels: string[]; //??
  labels_url: string;
  locked: boolean;
  milestone: null | string; //??
  node_id: string;
  number: number;
  performed_via_github_app: null | string; //??
  pull_request?: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
  };
  repository_url: string;
  state: string; // "open"
  title: string;
  updated_at: string;
  url: string;
  user: IApiUserSharedData;
}

export interface IApiRepositoryOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface IApiUserRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: IApiRepositoryOwner;
  html_url: string;
  description: null | string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: null | string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: null | string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: null | string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export class ApiRepository {
  /**
   * Used to get list of repository data by owner
   */

  public static list = async ({
    owner,
  }: {
    owner?: IApiRepositoryOwner['login'];
  }): Promise<IApiUserRepository[]> =>
    await apiRequest<IApiUserRepository[]>({
      endpoint: `${BASE_API_URL}/repos/${owner ? owner + '/' : ''}`,
      method: 'GET',
    });

  /**
   * Used to get repository data by owner and repo
   */

  public static retrieve = async ({
    owner,
    repo,
  }: {
    owner: IApiRepositoryOwner['login'];
    repo: IApiUserRepository['name'];
  }): Promise<IApiUserRepository> =>
    await apiRequest<IApiUserRepository>({
      endpoint: `${BASE_API_URL}/repos/${owner ? owner + '/' : ''}${
        repo ? repo + '/' : ''
      }`,
      method: 'GET',
    });

  /**
   * Used to get repository issues by owner and repo
   */

  public static issuesList = async ({
    owner,
    repo,
  }: {
    owner: IApiRepositoryOwner['login'];
    repo: IApiUserRepository['name'];
  }): Promise<IApiRepositoryIssue[]> =>
    await apiRequest<IApiRepositoryIssue[]>({
      endpoint: `${BASE_API_URL}/repos/${owner}/${repo}/issues`,
      method: 'GET',
    });

  /**
   * Used to get repository issue by owner, repo and issue number
   */

  public static issue = async ({
    owner,
    repo,
    number,
  }: {
    owner: IApiRepositoryOwner['login'];
    repo: IApiUserRepository['name'];
    number: IApiRepositoryIssue['number'];
  }): Promise<IApiRepositoryIssue> =>
    await apiRequest<IApiRepositoryIssue>({
      endpoint: `${BASE_API_URL}/repos/${owner}/${repo}/issues/${number}
      }`,
      method: 'GET',
    });

  /**
   * Used to get repository issue Comments by owner, repo and issue number
   */

  public static issueCommentsList = async ({
    owner,
    repo,
    number,
  }: {
    owner: IApiRepositoryOwner['login'];
    repo: IApiUserRepository['name'];
    number: IApiRepositoryIssue['number'];
  }): Promise<IApiRepositiryIssueComment[]> =>
    await apiRequest<IApiRepositiryIssueComment[]>({
      endpoint: `${BASE_API_URL}/repos/${owner}/${repo}/issues/${number}/comments`,
      method: 'GET',
    });
}
