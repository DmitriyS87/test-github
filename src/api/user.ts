import { apiRequest } from '../utils';
import { BASE_API_URL, IApiUserRepository } from '.';

export interface IApiUserSharedData {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: false;
  starred_url: string;
  subscriptions_url: string;
  type: string; // "User"
  url: string;
}

export interface IApiUser extends IApiUserSharedData {
  bio?: string;
  blog?: string;
  company?: null | string;
  created_at?: string;
  email?: null | string;
  followers?: number;
  following?: number;
  hireable?: null | string;
  location?: null | string;
  name?: string;
  public_gists?: number;
  public_repos?: number;
  twitter_username?: null | string;
  updated_at?: string;
}

export class ApiUser {
  /**
   * Used to get accounts list
   */

  public static list = async (): Promise<IApiUser[]> =>
    await apiRequest<IApiUser[]>({
      endpoint: `${BASE_API_URL}/users`,
      method: 'GET',
    });
  /**
   * Used to get account repositories data by name
   */

  public static repositoriesList = async ({
    login,
  }: {
    login: IApiUser['login'];
  }): Promise<IApiUserRepository[]> =>
    await apiRequest<IApiUserRepository[]>({
      endpoint: `${BASE_API_URL}/users/${login}/repos`,
      method: 'GET',
    });

  /**
   * Used to get account repository data by name or login
   */

  public static retrieve = async ({
    login,
    name,
  }: {
    login?: IApiUser['login'];
    name?: IApiUser['name'];
  }): Promise<IApiUser> =>
    await apiRequest<IApiUser>({
      endpoint: `${BASE_API_URL}/users/${name ? name : login ? login : ''}`,
      method: 'GET',
    });
}
